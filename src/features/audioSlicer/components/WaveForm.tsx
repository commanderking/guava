import { useRef, useEffect, useState } from "react";
// @ts-ignore - need WaveSurfer type to satsify types here
import { WaveSurfer as WaveSurferType } from "wavesurfer.js";
type Props = {
  audioUrl: string | null;
};

const REGION_ID = "userAudio";

const WaveForm = ({ audioUrl }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, toggleIsPlaying] = useState(false);
  const [waveSurferObject, setWaveSurferObject] =
    useState<WaveSurferType>(null);

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;
    const RegionsPlugin =
      // @ts-ignore - not sure if there's a better way to dynamically import here
      (await import("wavesurfer.js/dist/plugin/wavesurfer.regions.min.js"))
        .default;

    if (!containerRef.current || !audioUrl) {
      return null;
    }

    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      plugins: [
        RegionsPlugin.create({
          regions: [
            {
              id: REGION_ID,
              start: 0,
              end: 3,
              loop: false,
            },
          ],
        }),
      ],
    });

    waveSurfer.on("region-out", () => {
      toggleIsPlaying(false);
    });

    waveSurfer.load(audioUrl);
    setWaveSurferObject(waveSurfer);

    return () => {
      waveSurfer.destroy();
    };
  };

  const playRegion = () => {
    const { start, end } = waveSurferObject.regions.list[REGION_ID];
    const currentTime = waveSurferObject.getCurrentTime();

    // custom logic in case user pauses in middle of play. We don't want to play from the beginning of the region again, which is what region.list[REGION_ID].play() defaults to
    if (currentTime < end && currentTime > start) {
      waveSurferObject.play(currentTime, end);
    } else {
      waveSurferObject.regions.list[REGION_ID].play();
    }
  };

  const pauseRegion = () => {
    waveSurferObject.pause();
  };

  const playPause = () => {
    if (isPlaying) {
      pauseRegion();
    } else {
      playRegion();
    }
    toggleIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioUrl) {
      console.log("instantiating audio");
      create();
    }
  }, [audioUrl]);

  return (
    <>
      {audioUrl && (
        <div>
          <div key={"audioUrl"} ref={containerRef} />
          <button
            onClick={() => {
              return playPause();
            }}
            type="button"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </>
  );
};

export default WaveForm;

/* Resources - https://andreidobrinski.com/blog/implementing-an-audio-waveform-with-react-hooks-and-wavesurferjs/ 
https://github.com/ELATTAR-Ayoub/Next13js-wavesurfer.js/blob/master/components/waveSurfer.jsx
https://observablehq.com/@hellonearthis/wave-surfer-regions
*/

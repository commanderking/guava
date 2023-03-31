import { useRef, useEffect, useState } from "react";
// @ts-ignore - need WaveSurfer type to satsify types here
import { WaveSurfer as WaveSurferType } from "wavesurfer.js";
import { PlayCircle, PauseCircle } from "react-feather";
type Props = {
  audioUrl: string | null;
};

// With only one region allowed, setting a REGION_ID is fine.
const REGION_ID = "SINGLE_REGION_ID";

const defaultRegion = {
  id: REGION_ID,
  start: 0,
  end: 3,
  loop: false,
};

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

    // Clear out children so only one audio is visible. Removing this will append a new audio wave everytime the audio URL changes.
    containerRef.current.innerHTML = "";

    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      height: 64,
      plugins: [RegionsPlugin.create({})],
    });

    waveSurfer.load(audioUrl);
    waveSurfer.on("ready", () => {
      const audioEnd = waveSurfer.getDuration();
      waveSurfer.clearRegions();
      waveSurfer.addRegion({ ...defaultRegion, end: audioEnd });
    });
    waveSurfer.on("pause", () => {
      toggleIsPlaying(false);
    });
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
    create();
  }, [audioUrl]);

  return (
    <>
      {audioUrl && (
        <div className="flex">
          <button
            className="flex-none"
            onClick={() => {
              return playPause();
            }}
            type="button"
          >
            {isPlaying ? <PauseCircle size={48} /> : <PlayCircle size={48} />}
          </button>
          <div className="flex-initial w-full">
            <div className="w-full" ref={containerRef} />
          </div>
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

import { useRef, useEffect, useState } from "react";

type Props = {
  audioUrl: string;
};

const REGION_ID = "userAudio";

const WaveForm = ({ audioUrl }: Props) => {
  const containerRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isPlaying, toggleIsPlaying] = useState(false);
  const [waveSurferObject, setWaveSurferObject] = useState(null);
  console.log({ waveSurferObject });

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;
    const RegionsPlugin = (
      await import("wavesurfer.js/dist/plugin/wavesurfer.regions.min.js")
    ).default;

    console.log("wave surfing");

    if (!containerRef.current) {
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
              loop: true,
            },
          ],
        }),
      ],
    });
    waveSurfer.on("ready", () => {
      if (!waveSurferRef.current) {
        waveSurferRef.current = waveSurfer;
      }
    });
    waveSurfer.load(audioUrl);

    setWaveSurferObject(waveSurfer);

    return () => {
      waveSurfer.destroy();
    };
  };

  const playRegion = () => {
    // console.log({ waveSurferObject });
    // console.log(waveSurferObject.regions.list[REGION_ID]);

    // waveSurferObject.regions.list[REGION_ID].play();

    if (!waveSurferObject) {
      return;
    }

    console.log(waveSurferObject.regions.list[REGION_ID].start);

    const { start, end } = waveSurferObject.regions.list[REGION_ID];

    const currentTime = waveSurferObject.getCurrentTime();

    console.log({ currentTime });

    console.log({ start });
    console.log({ end });

    if (currentTime < end && currentTime > start) {
      waveSurferRef.current.play();
    } else {
      waveSurferRef.current.play(
        waveSurferObject.regions.list[REGION_ID].start
      );
    }
  };

  const pauseRegion = () => {
    waveSurferRef.current.pause();
  };

  const playPause = () => {
    console.log({ isPlaying });
    if (!isPlaying) {
      toggleIsPlaying(true);
      console.log({ isPlaying });

      playRegion();
      return;
    }
    pauseRegion();
    toggleIsPlaying(false);
  };

  useEffect(() => {
    if (audioUrl) {
      console.log("instantiating audio");
      create();
    }
  }, [audioUrl]);

  return (
    <>
      {audioUrl && <div key={"audioUrl"} ref={containerRef} />}
      <button
        onClick={() => {
          return playPause();
        }}
        type="button"
      >
        Play
      </button>
    </>
  );
};

export default WaveForm;

/* Resources - https://andreidobrinski.com/blog/implementing-an-audio-waveform-with-react-hooks-and-wavesurferjs/ 
https://github.com/ELATTAR-Ayoub/Next13js-wavesurfer.js/blob/master/components/waveSurfer.jsx
https://observablehq.com/@hellonearthis/wave-surfer-regions
*/

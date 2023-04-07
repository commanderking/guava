import { useRef, useEffect, useState } from "react";
// @ts-ignore - need WaveSurfer type to satsify types here
import { WaveSurfer as WaveSurferType } from "wavesurfer.js";
import { PlayCircle, PauseCircle, Plus, StopCircle } from "react-feather";
import { randomRGBA } from "src/features/audioSlicer/utils";
// @ts-ignore - it's able to find the RegionParams type
import { RegionParams } from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
type Props = {
  audioUrl: string | null;
};

const WaveForm = ({ audioUrl }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayingFullTrack, toggleIsPlayingFullTrack] = useState(false);
  const [currentlyPlayingRegionId, setcurrentlyPlayingRegionId] = useState<
    string | null
  >(null);

  const [waveSurferObject, setWaveSurferObject] =
    useState<WaveSurferType>(null);

  const [audioSlices, setAudioSlices] = useState<RegionParams[]>([]);

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;
    const RegionsPlugin =
      // @ts-ignore - not sure if there's a better way to dynamically import here
      (await import("wavesurfer.js/dist/plugin/wavesurfer.regions.min.js"))
        .default;

    if (!containerRef.current || !audioUrl) {
      return null;
    }

    // Clear out children so only one audio is visible. Otherwise, a new audio wave will be created everytime a new audio file is selected.
    containerRef.current.innerHTML = "";

    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      height: 64,
      plugins: [RegionsPlugin.create({})],
    });

    waveSurfer.load(audioUrl);
    waveSurfer.enableDragSelection({ color: randomRGBA() });

    waveSurfer.on("ready", () => {
      waveSurfer.clearRegions();
      setAudioSlices([]);
    });
    waveSurfer.on("pause", () => {
      setcurrentlyPlayingRegionId(null);
    });

    waveSurfer.on("region-created", (region: RegionParams) => {
      const regionColor = randomRGBA();
      region.color = regionColor;

      // region-created triggers right before the region is added regions.list, so we need to add newRegion to the audioSlices.
      // I also initially tried to store only values needed for rendering, but trying to store data as [...audioSlices, region] doesn't work. This function always thinks that audioSlices is [] even as the state is updated.
      setAudioSlices([...Object.values(waveSurfer.regions.list), region]);
    });

    setWaveSurferObject(waveSurfer);

    return () => {
      waveSurfer.destroy();
    };
  };

  // Don't use playPause here because playing the slices also triggers playing. The play/pause can get out of sync
  const playPauseFullTrack = () => {
    if (isPlayingFullTrack) {
      waveSurferObject.pause();
    } else {
      waveSurferObject.play();
    }

    toggleIsPlayingFullTrack(!isPlayingFullTrack);
  };

  // Only used when user clicks the "Add New Slice Button"
  const addNewSlice = () => {
    const newRegion = { start: 0, end: 3, loop: false, color: randomRGBA() };
    waveSurferObject.addRegion(newRegion);
  };

  const playStopRegion = (id: string) => {
    toggleIsPlayingFullTrack(false);
    if (currentlyPlayingRegionId === id) {
      setcurrentlyPlayingRegionId(null);
      waveSurferObject.stop();
      waveSurferObject.setCurrentTime(waveSurferObject.regions.list[id].start);
    } else {
      setcurrentlyPlayingRegionId(id);
      waveSurferObject.regions.list[id].play();
    }
  };

  useEffect(() => {
    create();
  }, [audioUrl]);

  return (
    <>
      {audioUrl && (
        <>
          <div className="flex">
            <button
              className="flex-none"
              onClick={() => {
                return playPauseFullTrack();
              }}
            >
              {isPlayingFullTrack ? (
                <PauseCircle size={48} />
              ) : (
                <PlayCircle size={48} />
              )}
            </button>
            <div className="flex-initial w-full">
              <div className="w-full" ref={containerRef} />
            </div>
          </div>
          <div className="m-4">
            <button
              className="flex items-center bg-lime-200 hover:bg-lime-300 text-black font-bold py-2 px-4 rounded-full"
              onClick={() => {
                addNewSlice();
              }}
            >
              <Plus size={24} />
              <span>Add New Slice</span>
            </button>
          </div>
        </>
      )}
      <div className="ml-24">
        {audioSlices.map((slice, index) => {
          return (
            <div key={slice.id} className="flex items-center">
              <button
                onClick={() => {
                  playStopRegion(slice.id);
                }}
              >
                {slice.id === currentlyPlayingRegionId ? (
                  <StopCircle fill={slice.color} size={48} />
                ) : (
                  <PlayCircle fill={slice.color} size={48} />
                )}
              </button>
              <span className="ml-4">Slice {index + 1}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WaveForm;

/* Resources - https://andreidobrinski.com/blog/implementing-an-audio-waveform-with-react-hooks-and-wavesurferjs/ 
https://github.com/ELATTAR-Ayoub/Next13js-wavesurfer.js/blob/master/components/waveSurfer.jsx
https://observablehq.com/@hellonearthis/wave-surfer-regions
*/

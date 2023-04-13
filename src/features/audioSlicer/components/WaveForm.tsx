import { useRef, useEffect, useState } from "react";
// @ts-ignore - need WaveSurfer type to satsify types here
import { WaveSurfer as WaveSurferType } from "wavesurfer.js";
import { PlayCircle, PauseCircle, StopCircle } from "react-feather";
import {
  randomRGBA,
  getTextById,
  formatSlicesToSave,
} from "src/features/audioSlicer/utils";
// @ts-ignore - only way to get this type(?)
import { Region } from "wavesurfer.js/dist/plugin/regions.d.ts";
import { SavedSlice, SliceTextType } from "src/features/audioSlicer/types";
import SliceText from "src/features/audioSlicer/components/SliceText";
import SaveSlices from "src/features/audioSlicer/components/SaveSlices";

type Props = {
  audioUrl: string | null;
  // It's necesssary to pass in loadedSlices from parent component, even if it's an empty array.  Trying to define default empty array in props results in infinite looping for useEffect - https://github.com/facebook/react/issues/15096
  loadedSlices: SavedSlice[];
  audioId?: string;
};

const defaultRGBA = "rgba(0, 0, 0, 0.1)";

const WaveForm = ({ audioUrl = "", loadedSlices, audioId }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayingFullTrack, toggleIsPlayingFullTrack] = useState(false);
  const [currentlyPlayingRegionId, setcurrentlyPlayingRegionId] = useState<
    string | null
  >(null);

  // Currently needed to keep track of the text of each slice. Since we don't control the params stored in wavesurfer region object, we can't append the text to the object. This is the workaround for now.
  const [textById, setTextById] = useState<{ [key: string]: SliceTextType }>(
    {}
  );
  const [editingSliceId, setEditingSliceId] = useState<string | null>(null);

  const [waveSurferObject, setWaveSurferObject] =
    useState<WaveSurferType>(null);

  const [audioSlices, setAudioSlices] = useState<Region[]>([]);

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
      responsive: true,
    });

    waveSurfer.load(audioUrl);
    waveSurfer.enableDragSelection({ color: defaultRGBA });

    waveSurfer.on("ready", () => {
      waveSurfer.clearRegions();
      if (loadedSlices && waveSurfer) {
        loadedSlices.forEach((slice) => {
          waveSurfer.addRegion(slice);
        });
      }
    });
    waveSurfer.on("pause", () => {
      setcurrentlyPlayingRegionId(null);
    });

    waveSurfer.on("region-created", (region: Region) => {
      // If slice is added, it should have a defaultRGBA. Assign a random color
      // Don't add a randomRGBA if one has already been assigned from a previous case
      if (region.color === defaultRGBA) {
        const regionColor = randomRGBA();
        region.color = regionColor;
      }

      // region-created triggers right before the region is added regions.list, so we need to add newRegion to the list of regions
      // I also tried to store only values needed for rendering, but trying to store data as [...audioSlices, region] doesn't work. This function always thinks that audioSlices is [] even as the state is updated.
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
    setAudioSlices([]);
    create();

    console.log({ audioUrl });
    console.log({ loadedSlices });
  }, [audioUrl, loadedSlices]);

  // Setup textById state on initailzation
  useEffect(() => {
    const textById = getTextById(loadedSlices);
    setTextById(textById);
  }, []);

  return (
    <>
      <div className="flex">
        <button
          className="flex-none"
          onClick={() => {
            playPauseFullTrack();
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
              <SliceText
                text={textById[slice.id]?.text || `Slice ${index + 1}`}
                isEditing={editingSliceId === slice.id}
                handleEdit={() => {
                  setEditingSliceId(slice.id);
                }}
                handleSave={(text: String) => {
                  setEditingSliceId(null);
                  setTextById({
                    ...textById,
                    [slice.id]: {
                      text,
                    },
                  });
                }}
              />
            </div>
          );
        })}
        {audioSlices.length > 0 && (
          <SaveSlices
            handleSave={() => {
              const data = formatSlicesToSave(
                // Hack for now - we should always have an audioId. Want to think through how to implement
                audioId || audioUrl || "",
                Object.values(waveSurferObject.regions.list),
                textById
              );

              // console log to save to data until we implement backend or in memory
              console.log({ data });
            }}
          />
        )}
      </div>
    </>
  );
};

export default WaveForm;

/* Resources - https://andreidobrinski.com/blog/implementing-an-audio-waveform-with-react-hooks-and-wavesurferjs/ 
https://github.com/ELATTAR-Ayoub/Next13js-wavesurfer.js/blob/master/components/waveSurfer.jsx
https://observablehq.com/@hellonearthis/wave-surfer-regions
*/

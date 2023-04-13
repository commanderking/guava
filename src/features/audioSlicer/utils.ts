import _ from "lodash";
import { SavedSlice, SliceTextType } from "src/features/audioSlicer/types";
// @ts-ignore
import { Region } from "wavesurfer.js/dist/plugin/regions.d.ts";

export function randomRGBA() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    "0.2" +
    ")"
  );
}

export const getTextById = (slices: SavedSlice[]) => {
  const slicesWithOnlyText = slices.map((slice) => ({
    id: slice.id,
    text: slice.text,
  }));

  return _.keyBy(slicesWithOnlyText, "id");
};

export const formatSlicesToSave = (
  audioId: string,
  regions: Region[],
  sliceTextById: { [key: string]: SliceTextType }
) => {
  const slices = regions.map((region) => {
    const text = sliceTextById[region.id]?.text || "";
    return {
      ..._.pick(region, ["id", "color", "start", "end"]),
      text,
    };
  });

  return {
    id: audioId,
    slices,
  };
};

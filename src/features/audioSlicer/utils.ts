import _ from "lodash";
import { SavedSlice } from "src/features/audioSlicer/types";
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

export const getSlicesById = (slices: SavedSlice[]) => {
  return _.keyBy(slices, "id");
};

export const formatSlicesToSave = (
  audioId: string,
  regions: Region[],
  sliceTextById: { [key: string]: any }
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

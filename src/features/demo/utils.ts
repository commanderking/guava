import _ from "lodash";
import { slicesData } from "src/features/demo/data";
import { AudioSlices } from "src/features/audioSlicer/types";

const getDemoOptions = (data: { [key: string]: AudioSlices }) => {
  const slices = _.values(slicesData);
  return slices.map((slice) => {
    return {
      value: slice.id,
      text: slice.name,
    };
  });
};

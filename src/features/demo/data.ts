import { SavedSlice } from "src/features/audioSlicer/types";

export const slicesData: {
  [key: string]: {
    id: string;
    slices: SavedSlice[];
  };
} = {
  "taigi_lesson1.m4a": {
    id: "taigi_lesson1.m4a",
    slices: [
      {
        id: "wavesurfer_58q8hoi7ib",
        color: "rgba(255, 76, 48, 0.2)",
        start: 0.4827878395860284,
        end: 2.236757654161276,
      },
      {
        id: "wavesurfer_bmvtoam4ckg",
        color: "rgba(1,163,32,0.2)",
        start: 2.5630776196636478,
        end: 5.447357050452782,
      },
      {
        id: "wavesurfer_cj3kn84gh0o",
        color: "rgba(40, 67, 135, 0.2)",
        start: 5.8262772746873654,
        end: 7.7026170763260025,
      },
      {
        id: "wavesurfer_gre781blfm",
        color: "rgba(159, 90, 253, 0.2)",
        start: 10.925026735661923,
        end: 15.705395860284604,
      },
    ],
  },
};

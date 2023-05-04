export type SavedSlice = {
  id: string;
  color: string;
  start: number;
  end: number;
  text?: string;
};

export type SliceTextType = {
  id: string;
  text: string | undefined;
};

export type AudioSlices = {
  id: string;
  name: string;
  slices: SavedSlice[];
};

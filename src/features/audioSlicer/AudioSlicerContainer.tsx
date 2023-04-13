import { useState } from "react";
import WaveForm from "src/features/audioSlicer/components/WaveForm";

export default function AudioSlicerContainer() {
  const [audio, setAudio] = useState<string | null>(null);

  const loadAudio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files && files[0]) {
      setAudio(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Guava Slicer</h1>
        <input
          className="border-2 p-4 rounded-xl"
          type="file"
          onChange={loadAudio}
        ></input>
      </div>
      {audio && (
        <div className="w-10/12 m-auto">
          <WaveForm audioUrl={audio} loadedSlices={[]} />
        </div>
      )}
    </div>
  );
}

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
      <div>Audio Slicer</div>
      <input type="file" onChange={loadAudio}></input>
      <div className="w-10/12 m-auto">
        <WaveForm audioUrl={audio} />
      </div>
    </div>
  );
}

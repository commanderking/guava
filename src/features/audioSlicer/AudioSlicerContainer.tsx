import { useEffect, useState } from "react";
import WaveForm from "src/features/audioSlicer/components/WaveForm";

export default function AudioSlicerContainer() {
  const [audio, setAudio] = useState<string | undefined>(undefined);

  const loadAudio = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("loaded");

    const files = event?.target?.files;

    if (files && files[0]) {
      setAudio(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div>
      <div>Audio Slicer</div>
      <input type="file" onChange={loadAudio}></input>
      <WaveForm audioUrl={audio} />
    </div>
  );
}

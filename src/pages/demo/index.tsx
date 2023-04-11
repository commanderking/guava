import { useState } from "react";

import WaveForm from "src/features/audioSlicer/components/WaveForm";
import Select from "src/components/Select";
import { slicesData } from "src/features/demo/data";

const options = [
  {
    text: "Taiwanese Lesson 1",
    value: "taigi_lesson1.m4a",
  },
  {
    text: "Taiwanese Lesson 3",
    value: "taigi_lesson3.m4a",
  },
];

const DemoContainer = () => {
  const [selectedAudio, setSelectedAudio] = useState(options[0].value);

  const handleSelect = (value: string) => {
    setSelectedAudio(value);
  };

  return (
    <div className="w-8/12 m-auto mt-8 p-8">
      <div className="w-1/4 m-auto">
        <Select
          options={options}
          defaultText="Select Demo Audio"
          handleSelect={handleSelect}
        />
      </div>
      <div className="p-8">
        <WaveForm
          audioUrl={selectedAudio}
          loadedSlices={
            (slicesData[selectedAudio] && slicesData[selectedAudio].slices) ||
            []
          }
        />
      </div>
    </div>
  );
};

export default DemoContainer;

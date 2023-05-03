import { useState } from "react";

import WaveForm from "src/features/audioSlicer/components/WaveForm";
import Select from "src/components/Select";
import { slicesData } from "src/features/demo/data";

const options = [
  {
    text: "Taiwanese Lesson 11",
    value: "taigi_lesson11.m4a",
  },
  {
    text: "Taiwanese Lesson 1",
    value: "taigi_lesson1.m4a",
  },
  {
    text: "Taiwanese Lesson 3",
    value: "taigi_lesson3.m4a",
  },
  {
    text: "Taiwanese Lesson 5",
    value: "taigi_lesson5.m4a",
  },
  {
    text: "Taiwanese Lesson 6",
    value: "taigi_lesson6.m4a",
  },
  {
    text: "Taiwanese Lesson 7",
    value: "taigi_lesson7.m4a",
  },
  {
    text: "Taiwanese Lesson 10",
    value: "taigi_lesson10.m4a",
  },
];

const DemoContainer = () => {
  const [selectedAudio, setSelectedAudio] = useState(options[0].value);

  const handleSelect = (value: string) => {
    setSelectedAudio(value);
  };

  const loadedSlices = slicesData[selectedAudio]?.slices || [];

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
          loadedSlices={loadedSlices}
          audioId={slicesData[selectedAudio]?.id}
        />
      </div>
    </div>
  );
};

export default DemoContainer;

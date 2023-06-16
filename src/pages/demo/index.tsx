import { useState } from "react";

import WaveForm from "src/features/audioSlicer/components/WaveForm";
import Select from "src/components/Select";
import { slicesData } from "src/features/demo/data";
import { getDemoOptions } from "src/features/demo/utils";

const DemoContainer = () => {
  const options = [...getDemoOptions(slicesData).reverse()];
  const [selectedAudio, setSelectedAudio] = useState(options[0].value);

  const handleSelect = (value: string) => {
    setSelectedAudio(value);
  };

  const loadedSlices = slicesData[selectedAudio]?.slices || [];

  return (
    <div className="w-10/12 md:w-8/12 m-auto mt-8 p-2 md:p-8">
      <div className="w-full sm:w-1/2 m-auto">
        <Select
          options={options}
          defaultText="Select Demo Audio"
          handleSelect={handleSelect}
        />
      </div>
      <div className="p-2 md:p-8">
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

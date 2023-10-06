import { AgGridReact } from "ag-grid-react";
import { useMemo, useEffect } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { PlayCircle } from "react-feather";

type Params = {
  value: string;
};

const AudioRenderer = ({ value }: Params) => {
  const audio = new Audio(value);

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };
  return (
    <div className="flex h-full align-items-center">
      <audio src={value} />
      <button>
        <PlayCircle onClick={playAudio} />
      </button>
    </div>
  );
};

const TextRenderer = ({ value }: Params) => {
  return (
    <div className="select-text" style={{ wordBreak: "break-word" }}>
      {value}
    </div>
  );
};

const VocabTableContainer = ({ rowData }: { rowData: any }) => {
  const columnDefs = useMemo(
    () => [
      { field: "audio", cellRenderer: AudioRenderer, width: 75 },
      {
        field: "audioText",
        cellRenderer: TextRenderer,
        wrapText: true,
        autoHeight: true,
      },
      {
        field: "primaryTranslation",
        cellRenderer: TextRenderer,
        wrapText: true,
        autoHeight: true,
      },
    ],
    []
  );

  const handleGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div className="ag-theme-alpine m-auto mt-16 w-[600px]">
      <h1 className="text-center text-xl mb-4">All Items</h1>
      <AgGridReact
        domLayout="autoHeight"
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={handleGridReady}
      />
    </div>
  );
};

export default VocabTableContainer;

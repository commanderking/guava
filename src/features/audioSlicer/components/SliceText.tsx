import { CheckCircle, Edit, XCircle } from "react-feather";
import { useState } from "react";

type Props = {
  text: string;
  isEditing: boolean;
  handleEdit: () => void;
  handleSave: (text: string) => void;
  handleDelete: () => void;
};

const SliceText = ({
  text,
  isEditing,
  handleEdit,
  handleSave,
  handleDelete,
}: Props) => {
  const [value, setValue] = useState(text);

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSave(value);
            }
          }}
        ></input>
      ) : (
        <span className="ml-4">{text}</span>
      )}
      <button
        onClick={() => {
          if (isEditing) {
            handleSave(value);
          } else {
            handleEdit();
          }
        }}
        className="ml-4"
      >
        {isEditing ? <CheckCircle size={24} /> : <Edit size={24} />}
      </button>
      <button
        onClick={() => {
          handleDelete();
        }}
        className="ml-4"
      >
        <XCircle size={24} />
      </button>
    </>
  );
};

export default SliceText;

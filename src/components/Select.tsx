type Option = {
  value: string;
  text: string;
};

type Props = {
  defaultText: string;
  options: Option[];
  handleSelect: (event: string) => void;
};

const Select = ({ defaultText, options, handleSelect }: Props) => {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {defaultText}
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(event) => {
          handleSelect(event.target.value);
        }}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;

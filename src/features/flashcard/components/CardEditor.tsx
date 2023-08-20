import { cardAttributes } from "src/features/flashcard/constants";
import { CardAttributeDisplay } from "src/features/flashcard/types";

const CardAttributeChecklist = ({
  attribute,
}: {
  attribute: CardAttributeDisplay;
}) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id={attribute.key}
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {attribute.label}
      </label>
    </div>
  );
};

const CardEditor = () => {
  return (
    <div className="p-2 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 ">
      <div className="grid mb-8 md:mb-12 md:grid-cols-2">
        <div>
          <h3>Card Front</h3>
          {cardAttributes.map((attribute) => {
            return <CardAttributeChecklist attribute={attribute} />;
          })}
        </div>
        <div>
          <h3>Card Back</h3>
          {cardAttributes.map((attribute) => {
            return <CardAttributeChecklist attribute={attribute} />;
          })}
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        Save Slices
      </button>
    </div>
  );
};

export default CardEditor;

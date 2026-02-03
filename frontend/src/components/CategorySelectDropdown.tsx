  //the drop-down menu for selecting categories


import { CATEGORIES } from "../constants";

interface CategorySelectProps {
    value: string;
    onChange: (value:string) => void; //take input as a string but after the action there is no output(void)
}

export default function CategorySelectDropdown({value, onChange}:CategorySelectProps) {

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">
        CATEGORY
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
          //here value = description and label = title
        ))}
      </select>
    </div>
  );
}

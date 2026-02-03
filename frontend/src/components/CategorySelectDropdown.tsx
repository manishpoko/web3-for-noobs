  //the drop-down menu for selecting categories


import { useState } from "react";
import { CATEGORIES } from "../constants";

export default function CategorySelectDropdown() {
  const [category, setCategory] = useState(CATEGORIES[0].value);

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">
        CATEGORY
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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

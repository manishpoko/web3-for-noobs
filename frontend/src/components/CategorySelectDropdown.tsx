import { CATEGORIES } from "../constants";

interface CategorySelectProps {
    value: string;
    onChange: (value:string) => void;
}

export default function CategorySelectDropdown({value, onChange}:CategorySelectProps) {
  return (
    <div className="font-mono">
      <label className="block text-xs font-bold text-acid mb-2 tracking-widest">
        // SELECT_CATEGORY
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full 
            p-3 
            bg-black 
            text-white 
            border border-white/20 
            rounded-none 
            focus:border-acid 
            focus:ring-1 focus:ring-acid/50
            outline-none 
            appearance-none 
            cursor-pointer
            transition-all
            uppercase
          "
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value} className="bg-black text-white">
              {cat.label}
            </option>
          ))}
        </select>
        
        {/* custom arrow for the cool 'tech' feel */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-acid">
          ▼
        </div>
      </div>
    </div>
  );
}
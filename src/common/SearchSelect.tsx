"use client";
import { Option, SearchSelectProps } from "@/types/search/select";
import Select, { ActionMeta, MultiValue } from "react-select";

export default function SearchSelect<T extends Option>({
  options,
  onChange,
  placeholder = "Select...",
  value,
}: SearchSelectProps<T>) {
  const getValue = () => {
    return value ? value : [];
  };

  const handleChange = (newValue: MultiValue<T>, actionMeta: ActionMeta<T>) => {
    onChange(newValue);
  };

  return (
    <Select
      isMulti
      options={options}
      value={getValue()}
      onChange={handleChange}
      placeholder={placeholder}
      classNamePrefix="react-select"
      className="w-44"
    />
  );
}

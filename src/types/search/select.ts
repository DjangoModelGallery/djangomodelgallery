import { MultiValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SearchSelectProps<T> {
  options: T[];
  onChange: (value: MultiValue<T>) => void;
  placeholder?: string;
  value?: MultiValue<T>;
}

export type { Option, SearchSelectProps };

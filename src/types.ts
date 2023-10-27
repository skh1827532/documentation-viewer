export interface DataItem {
  title: string;
  bodyText: string;
}

export interface DescriptionComponentProps {
  bodyText: string;
}

export interface NavbarProps {
  title: string;
}

export interface InputProps {
  onClick: () => void;
  input: string;
  setInput: (value: string) => void;
  empty: boolean;
}

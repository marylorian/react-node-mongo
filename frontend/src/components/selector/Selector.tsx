import { ChangeEvent, useCallback, useState } from "react";
import { withLabel } from "../../utils/withLabel";
import { StyledSelector, Option } from "./Selector.styled";

interface SelectorProps {
  values: string[];
  initialValue?: string;
  placeholder: string;
  onChange?: (newValue: string) => void;
}

export const Selector = ({
  values = [],
  initialValue = "",
  placeholder,
  onChange,
}: SelectorProps) => {
  const [activeValue, setActiveValue] = useState<string>(initialValue);

  const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setActiveValue(e.target.value);
    onChange?.(e.target.value);
  }, []);

  return (
    <StyledSelector value={activeValue} onChange={handleChange}>
      <Option value="">{placeholder}</Option>
      {values.map((value) => (
        <Option key={value} value={value}>
          {value}
        </Option>
      ))}
    </StyledSelector>
  );
};

export const SelectorWithLabel = withLabel<SelectorProps>(Selector);

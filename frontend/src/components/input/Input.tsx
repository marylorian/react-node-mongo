import React, {
  ChangeEvent,
  ComponentType,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";
import { StyledInput } from "./Input.styled";
import { withLabel } from "../../utils/withLabel";

export interface InputProps
  extends Omit<InputHTMLAttributes<{}>, "value" | "onChange"> {
  initialValue?: string | number;
  onChange?: (newValue: string) => void;
}

export const Input = ({
  onChange,
  initialValue = "",
  ...props
}: InputProps) => {
  const [value, setValue] = useState<InputProps["initialValue"]>(initialValue);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e?.target?.value || "";

    setValue(newValue);
    onChange?.(newValue);
  }, []);

  return <StyledInput {...props} value={value} onChange={handleChange} />;
};

export const InputWithLabel = withLabel<InputProps>(Input);

import { ButtonHTMLAttributes } from "react";
import { ButtonMode } from "./constants";
import { StyledButton } from "./Button.styled";

interface ButtonProps extends ButtonHTMLAttributes<{}> {
  mode?: ButtonMode;
}

export const Button = ({
  mode = ButtonMode.Primary,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton $mode={mode} {...props}>
      {children}
    </StyledButton>
  );
};

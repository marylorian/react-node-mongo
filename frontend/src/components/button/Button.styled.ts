import styled, { css } from "styled-components";
import { ButtonMode } from "./constants";

export const StyledButton = styled.button<{ $mode: ButtonMode }>`
  border: none;
  padding: 8px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color, color 0.3s linear;

  ${({ theme: { colors }, $mode }) => {
    if ($mode === ButtonMode.Secondary) {
      return css`
        color: ${colors.dark};
        background-color: ${colors.primary};

        :hover {
          background-color: ${colors.dark};
          color: ${colors.bright};
        }
      `;
    }
    if ($mode === ButtonMode.Primary) {
      return css`
        color: ${colors.bright};
        background-color: ${colors.secondary};

        :hover {
          color: ${colors.dark};
          background-color: ${colors.primary};
        }
      `;
    }
  }}
`;

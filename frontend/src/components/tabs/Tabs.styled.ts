import styled from "styled-components";

export const Wrapper = styled.fieldset`
  border: none;
  background-color: ${({ theme: { colors } }) => colors.dark};
  display: flex;
  max-width: fit-content;
  border-radius: 50em;

  > input:first-child + label {
    border-radius: 50em 0 0 50em;
  }

  > label:last-child {
    border-radius: 0 50em 50em 0;
  }
`;

export const Radio = styled.input.attrs({ type: "radio" })`
  display: none;

  + label {
    padding: 12px;
    position: relative;
    cursor: pointer;
    color: ${({ theme: { colors, opacityHex } }) =>
      `${colors.bright}${opacityHex[80]}`};
  }

  + label:hover {
  }

  :checked + label {
    color: ${({ theme: { colors } }) => colors.bright};
    background-color: ${({ theme: { colors } }) => colors.secondary};
  }
`;

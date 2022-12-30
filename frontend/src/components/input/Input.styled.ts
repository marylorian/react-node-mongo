import styled from "styled-components";

export const StyledInput = styled.input`
  margin-bottom: 12px;
  border-width: 1px;
  border-radius: 8px;
  padding: 8px;
  border-color: ${({ theme: { colors } }) => colors.dark};
  color: ${({ theme: { colors } }) => colors.dark};

  :invalid:required {
    box-shadow: 0 0 4px 1px ${({ theme: { colors } }) => colors.bright};
    border-color: ${({ theme: { colors } }) => colors.bright};
  }
`;

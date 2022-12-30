import styled from "styled-components";

export const StyledSelector = styled.select`
  padding: 8px 4px;
  border: 1px solid ${({ theme: { colors } }) => colors.dark};
  border-radius: 8px;
  margin-bottom: 12px;
  color: ${({ theme: { colors } }) => colors.dark};
`;

export const Option = styled.option``;

import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0;
`;

export const DishWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme: { colors } }) => colors.dark};
  border-radius: 8px;
  padding: 12px;
`;

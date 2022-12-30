import styled from "styled-components";
import { Wrapper as TabsWrapper } from "../../components/tabs/Tabs.styled";

export const AuthFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 420px;
  width: 50%;
  padding: 16px;
  margin: 16px 0;
  border: 1px solid ${({ theme: { colors } }) => colors.dark};
  border-radius: 12px;

  > ${TabsWrapper} {
    margin-bottom: 24px;
  }
`;

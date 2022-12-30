import styled, { css } from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Wrapper = styled.div`
  font-size: calc(10px + 2vmin);
  background-color: ${({ theme: { colors } }) => colors.dark};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
`;

export const UserBlock = styled.div`
  padding: 16px;
`;

const linkStyles = css`
  color: ${({ theme: { colors } }) => colors.bright};
  padding: 16px;
  text-decoration: none;

  :hover,
  :active {
    text-decoration: underline;
  }
`;

export const NativeLink = styled.a`
  ${linkStyles}
`;

export const Link = styled(RouterLink)<{ $isActive?: boolean }>`
  ${linkStyles}

  ${({ $isActive }) =>
    $isActive &&
    css`
      text-decoration: underline;
    `}
`;

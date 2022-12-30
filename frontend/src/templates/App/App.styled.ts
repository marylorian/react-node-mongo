import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: 'Open Sans', sans-serif; 
   }

   #root{
       margin: 0 auto;
   }
`;

export const Main = styled.main`
  padding: 16px;
  color: ${({ theme: { colors } }) => colors.dark};

  h1,
  h2,
  h3 {
    margin-bottom: 12px;
  }
`;

const darkScheme = {
  black: "#1F1D36",
  navi: "#3F3351",
  purple: "#864879",
  peach: "#E9A6A6",
};

export const theme = {
  colors: {
    primary: darkScheme.purple,
    secondary: darkScheme.navi,
    bright: darkScheme.peach,
    dark: darkScheme.black,
  },
  opacityHex: {
    95: "F2",
    90: "E6",
    85: "D9",
    80: "CC",
  },
};

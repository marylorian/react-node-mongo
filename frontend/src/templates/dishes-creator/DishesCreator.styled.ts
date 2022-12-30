import styled from "styled-components";

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const SelectorWithLabelWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  > label {
    margin-right: 16px;
    margin-bottom: 12px;
  }

  > select {
    flex-grow: 1;
  }
`;

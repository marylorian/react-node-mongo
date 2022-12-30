import React, { ComponentType, ReactNode } from "react";
import styled from "styled-components";

export const Label = styled.label`
  margin-bottom: 8px;
`;

type WithLabel<T> = T & { id: string; label: ReactNode };

export const withLabel =
  <T,>(Component: ComponentType<T>) =>
  ({ id, label, ...props }: WithLabel<T>) =>
    (
      <React.Fragment>
        <Label htmlFor={id}>{label}:</Label>
        {/* @ts-expect-error: generic type works incorrect with internal React component typings */}
        <Component {...props} id={id} name={id} />
      </React.Fragment>
    );

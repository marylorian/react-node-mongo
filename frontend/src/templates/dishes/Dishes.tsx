import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

import { useFetch } from "../../hooks/useFetch";
import { DishCategory, DishLabel } from "../dishes-creator/constants";
import { ContentWrapper, DishWrapper } from "./Dishes.styled";

interface Dish {
  name: string;
  description: string;
  label: DishLabel;
  category: DishCategory;
  price: number;
}

export const Dishes = () => {
  const navigate = useNavigate();
  const { data } = useFetch<Dish[]>({ url: "/dishes" });

  return (
    <div>
      <h1>Hello, it's our Dishes</h1>

      <Button onClick={() => navigate("/dishes/create")}>Add new dish</Button>

      <ContentWrapper>
        {data?.map(({ name, description, label, category, price }) => (
          <DishWrapper key={name}>
            <p>Name: {name}</p>
            <p>Description: {description}</p>
            <p>Category: {category}</p>
            <p>Price: ${price}</p>
          </DishWrapper>
        ))}
      </ContentWrapper>
    </div>
  );
};

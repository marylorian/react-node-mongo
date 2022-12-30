import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Selector, SelectorWithLabel, Input, Button } from "../../components";
import { useFetch } from "../../hooks/useFetch";
import { DishCategory, DishLabel } from "./constants";
import { Wrapper, SelectorWithLabelWrapper } from "./DishesCreator.styled";

export const DishesCreator = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<DishCategory | string>("");
  const [label, setLabel] = useState<DishLabel | string>("");
  const [price, setPrice] = useState<number | string>(0.0);

  const navigate = useNavigate();
  const {
    data,
    refetch: submit,
    isError,
    isLoading,
  } = useFetch({
    url: "/dishes",
    options: { method: "POST" },
    isPrevented: true,
  });

  const handleSubmit = () => {
    if (!name || !description || !price || !category) {
      return;
    }
    submit({ data: { name, description, price, category, label } });
  };

  useEffect(() => {
    if (!isError && !isLoading && data) {
      navigate("/dishes");
    }
  }, [isError, isLoading, data]);

  return (
    <div>
      <h1>Hello, it's Dishes Creator</h1>

      <Wrapper onSubmit={(e) => e.preventDefault()}>
        <Input required placeholder="Name" onChange={setName} />
        <Input required placeholder="Description" onChange={setDescription} />
        <Selector
          placeholder="--Choose Dish Category--"
          values={Object.values(DishCategory)}
          onChange={setCategory}
        />
        <SelectorWithLabelWrapper>
          <SelectorWithLabel
            id="dish-creator__label"
            label="Choose Dish Label"
            placeholder="None"
            values={Object.values(DishLabel)}
            onChange={setLabel}
          />
        </SelectorWithLabelWrapper>
        <Input
          required
          type="number"
          min={0.0}
          max={1000.0}
          placeholder="Price"
          step="any"
          initialValue={price}
          onChange={setPrice}
        />

        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Wrapper>
    </div>
  );
};

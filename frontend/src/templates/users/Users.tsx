import React from "react";
import { useFetch } from "../../hooks/useFetch";

export const Users = () => {
  const { data, isError, isLoading } = useFetch({ url: "/users" });

  console.log({ data, isError, isLoading });

  return (
    <div>
      <h1>Hello, it's Users</h1>
    </div>
  );
};

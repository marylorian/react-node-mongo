import React, { createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { NavBar } from "../../components";
import { UserContextProvider } from "../../providers";
import { Auth } from "../authorization";
import { Dishes } from "../dishes";
import { DishesCreator } from "../dishes-creator";
import { Users } from "../users";
import GlobalStyles, { Main, theme } from "./App.styled";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <GlobalStyles />
        <Router>
          <NavBar />

          <Main>
            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/dishes" element={<Dishes />} />
              <Route path="/dishes/create" element={<DishesCreator />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/" element={<p>root</p>} />
            </Routes>
          </Main>
        </Router>
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;

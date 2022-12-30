import "react";
import { useLocation } from "react-router-dom";

import { NavBarItem, navBarItems } from "./constants";
import { LoginButton } from "./LoginButton";
import { Wrapper, LeftSide, Link } from "./NavBar.styled";

export const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <LeftSide>
        {Object.values(NavBarItem).map((key) => {
          const { url, label } = navBarItems[key];

          return (
            <Link key={key} title={label} $isActive={url === pathname} to={url}>
              {label}
            </Link>
          );
        })}
      </LeftSide>

      <LoginButton />
    </Wrapper>
  );
};

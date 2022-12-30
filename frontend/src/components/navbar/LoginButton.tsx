import { useCallback, useContext, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../providers";
import { Link, NativeLink, UserBlock } from "./NavBar.styled";

export const LoginButton = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const hangleLogout = useCallback((e: MouseEvent) => {
    e.preventDefault();

    localStorage.setItem("access_token", "");
    setUser(undefined);

    navigate("/login");
  }, []);

  if (user) {
    const { firstname, lastname, username } = user;
    const nameLabel =
      firstname || lastname ? `${firstname} ${lastname}` : username;

    return (
      <UserBlock>
        <span>{nameLabel}</span>
        <NativeLink href="#" onClick={hangleLogout}>
          Logout
        </NativeLink>
      </UserBlock>
    );
  }

  return <Link to="/login">Login</Link>;
};

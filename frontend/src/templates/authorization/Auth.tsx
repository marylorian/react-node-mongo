import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "../../components/button";

import { Input } from "../../components/input";
import { Tabs } from "../../components/tabs";
import { useFetch } from "../../hooks/useFetch";
import { User, UserContext } from "../../providers";
import { ApiService } from "../../services/ApiService";
import { AuthFormWrapper } from "./Auth.styled";

const authTypeItems = [
  { id: "auth-type__login", label: "I have the account" },
  { id: "auth-type__signup", label: "I'd like to create an account" },
];

export const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  const { setUser: setContextUser } = useContext(UserContext);

  const { refetch: signUp } = useFetch({
    url: "/auth/signup",
    options: { method: "POST" },
    isPrevented: true,
    withCredentials: false,
  });
  const { refetch: logIn, data: loginData } = useFetch<{
    token?: string;
    user?: User;
  }>({ url: "/auth/login", isPrevented: true, withCredentials: false });

  const handleRadioClick = useCallback(
    (activeTab: { id?: string; label: string }) => {
      if (activeTab.id?.includes("signup")) {
        setIsRegistration(true);
        return;
      }

      setIsRegistration(false);
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (isRegistration) {
      signUp({ data: { username, password } });
      return;
    }

    logIn({ params: { username, password } });
  }, [username, password, isRegistration]);

  useEffect(() => {
    if (loginData?.token && loginData?.user) {
      localStorage.setItem("access_token", loginData?.token || "");
      ApiService.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("acess_token")}`;

      setContextUser(loginData?.user);
    }
  }, [loginData?.token]);

  return (
    <div className="auth">
      <h1>Authorization</h1>

      <AuthFormWrapper>
        <Tabs
          htmlName="auth-type"
          initialActiveTabId={
            isRegistration ? "auth-type__signup" : "auth-type__login"
          }
          items={authTypeItems}
          onChange={handleRadioClick}
        />

        <Input
          id="username"
          placeholder="Username"
          type="text"
          onChange={setUsername}
        />
        <Input
          id="password"
          placeholder="Password"
          type="password"
          onChange={setPassword}
        />

        <Button onClick={handleSubmit}>Submit</Button>
      </AuthFormWrapper>
    </div>
  );
};

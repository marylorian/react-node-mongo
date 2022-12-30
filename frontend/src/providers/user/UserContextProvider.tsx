import { createContext, ReactNode, useState } from "react";

export interface User {
  firstname: string | undefined;
  lastname: string | undefined;
  username: string | undefined;
  isAdmin: boolean;
}

interface UserContextInterface {
  user: User | undefined;
  setUser: Function;
}

export const UserContext = createContext<UserContextInterface>({
  user: undefined,
  setUser: () => false,
});

export const UserContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export enum NavBarItem {
  Users = "users",
  Dishes = "dishes",
}

export const navBarItems: {
  [key in NavBarItem]: { url: string; label: string };
} = {
  [NavBarItem.Users]: {
    url: "/users",
    label: "Users",
  },
  [NavBarItem.Dishes]: {
    url: "/dishes",
    label: "Dishes",
  },
};

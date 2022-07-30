import NotFound from "../pages/404";
import Account from "../pages/Account";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Server from "../pages/Server";
import Setting from "../pages/Setting";
import UserInfo from "../pages/UserInfo";
import Users from "../pages/Users";

export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/users", component: Users },
  { path: "/users/:id", component: UserInfo },
  { path: "/login", component: Login, layout: null },
  { path: "/account", component: Account },
  { path: "/servers", component: Server },
  { path: "/settings", component: Setting },
  { path: "/error", component: NotFound, layout: null },
];

export const privateRoutes = [];

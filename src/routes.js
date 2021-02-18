import HomeFeed from "views/pages/HomeFeed.js";
import Login from "views/pages/Login.js";
import Notifications from "views/pages/Notifications.js";
import Account from "views/pages/Account.js";
import Register from "views/pages/Register.js";

const routes = [
  {
    path: "/feed",
    name: "Home",
    icon: "ni ni-shop text-primary",
    component: HomeFeed,
    layout: "/home",
    sidebar: true
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ni ni-ungroup text-orange",
    component: Notifications,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/account",
    name: "Account",
    icon: "ni ni-ui-04 text-info",
    component: Account,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/login",
    name: "Login",
    miniName: "L",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    miniName: "R",
    component: Register,
    layout: "/auth"
  }
];

export default routes;
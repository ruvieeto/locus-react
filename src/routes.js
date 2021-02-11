import Dashboard from "views/pages/dashboards/Dashboard.js";
import Login from "views/pages/examples/Login.js";
import Notifications from "views/pages/components/Notifications.js";
import Profile from "views/pages/examples/Profile.js";
import Register from "views/pages/examples/Register.js";

const routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "ni ni-shop text-primary",
    component: Dashboard,
    layout: "/admin",
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
    path: "/profile",
    name: "Account",
    icon: "ni ni-ui-04 text-info",
    component: Profile,
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
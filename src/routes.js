/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import Alternative from "views/pages/dashboards/Alternative.js";
// import Buttons from "views/pages/components/Buttons.js";
// import Calendar from "views/pages/Calendar.js";
// import Cards from "views/pages/components/Cards.js";
// import Charts from "views/pages/Charts.js";
// import Components from "views/pages/forms/Components.js";
import Dashboard from "views/pages/dashboards/Dashboard.js";
// import Elements from "views/pages/forms/Elements.js";
// import Google from "views/pages/maps/Google.js";
// import Grid from "views/pages/components/Grid.js";
// import Icons from "views/pages/components/Icons.js";
import Lock from "views/pages/examples/Lock.js";
import Login from "views/pages/examples/Login.js";
import Notifications from "views/pages/components/Notifications.js";
import Pricing from "views/pages/examples/Pricing.js";
import Profile from "views/pages/examples/Profile.js";
// import ReactBSTables from "views/pages/tables/ReactBSTables.js";
import Register from "views/pages/examples/Register.js";
// import RTLSupport from "views/pages/examples/RTLSupport.js";
// import Sortable from "views/pages/tables/Sortable.js";
// import Tables from "views/pages/tables/Tables.js";
import Timeline from "views/pages/examples/Timeline.js";
// import Typography from "views/pages/components/Typography.js";
// import Validation from "views/pages/forms/Validation.js";
// import Vector from "views/pages/maps/Vector.js";
// import Widgets from "views/pages/Widgets.js";

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
    path: "/bookmarks",
    name: "Bookmarks",
    icon: "ni ni-single-copy-04 text-pink",
    component: Notifications,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-ui-04 text-info",
    component: Profile,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/pricing",
    name: "Pricing",
    miniName: "P",
    component: Pricing,
    layout: "/auth"
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
  },
  {
    path: "/lock",
    name: "Lock",
    miniName: "L",
    component: Lock,
    layout: "/auth"
  },
  {
    path: "/timeline",
    name: "Timeline",
    miniName: "T",
    component: Timeline,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    miniName: "P",
    component: Profile,
    layout: "/admin"
  }
];

export default routes;

// Auth Pages and stuff

  // {
  //   collapse: true,
  //   name: "Examples",
  //   icon: "ni ni-ungroup text-orange",
  //   state: "examplesCollapse",
  //   views: [
  //     {
  //       path: "/pricing",
  //       name: "Pricing",
  //       miniName: "P",
  //       component: Pricing,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/login",
  //       name: "Login",
  //       miniName: "L",
  //       component: Login,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/register",
  //       name: "Register",
  //       miniName: "R",
  //       component: Register,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/lock",
  //       name: "Lock",
  //       miniName: "L",
  //       component: Lock,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/timeline",
  //       name: "Timeline",
  //       miniName: "T",
  //       component: Timeline,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/profile",
  //       name: "Profile",
  //       miniName: "P",
  //       component: Profile,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/rtl-support",
  //       name: "RTL Support",
  //       miniName: "RS",
  //       component: RTLSupport,
  //       layout: "/rtl"
  //     }
  //   ]
  // },
  // 
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   miniName: "RS",
  //   component: RTLSupport,
  //   layout: "/rtl"
  // }

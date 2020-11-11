import Vue from "vue";
import VueRouter from "vue-router";

import {
  Reports,
  About,
  Upload,
  Home,
  NotFound,
  Login,
  Dashboard,
} from "@/views";
import { auth } from "@/libs/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { private: false },
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: { private: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { private: true },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { private: false },
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
    meta: { private: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { private: false },
  },
  {
    path: "*",
    component: NotFound,
    meta: { private: false },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.private)) {
    if (!auth.currentUser) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

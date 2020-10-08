import Vue from "vue";
import VueRouter from "vue-router";

import { Reports, About, Upload, Home, NotFound } from "@/views";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

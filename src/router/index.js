import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import AddArticle from "@/views/admin/AddArticle.vue";
import Register from "@/views/users/Register.vue";
import UpdateArticle from "@/views/admin/UpdateArticle.vue";
import { auth } from "@/firebase/configs";
const isAuth = (to, from) => {
  let user = auth.currentUser;
  if (!user) {
    return "/users/register";
  }
  return true;
};
const isLogged = (to, from) => {
  let user = auth.currentUser;
  if (user) {
    return "/";
  }
  return true;
};
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/admin/add-article",
      name: "add-article",
      component: AddArticle,
      beforeEnter: isAuth,
    },
    {
      path: "/users/register",
      name: "register",
      component: Register,
      beforeEnter: isLogged,
    },
    {
      path: "/admin/update-article/:id",
      name: "update-article",
      component: UpdateArticle,
      beforeEnter: isAuth,
    },
  ],
  linkActiveClass: "active",
});

export default router;

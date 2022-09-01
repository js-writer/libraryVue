import { createRouter, createWebHistory } from "vue-router";
import BooksView from "../views/BooksView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: "/",
      name: "books",
      component: () => import("../views/BooksView.vue")
    },
    {
      path: "/readers",
      name: "readers",
      component: () => import("../views/ReadersView.vue")
    },
    {
      path: "/borrows",
      name: "borrows",
      component: () => import("../views/BorrowsView.vue")
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        hideNavbar: true
      }
    },
    { 
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import("../views/404View.vue")
    }
  ],
});

export default router;

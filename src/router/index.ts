import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import { getCurrentUser, getUser } from "@/logic/firebase";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Login",
        component: Home,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/privacy",
        name: "Privacy",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Privacy.vue"),
    },
    {
        path: "/imprint",
        name: "Imprint",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Imprint.vue"),
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("../views/Overview.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/home/show/:id",
        name: "Show",
        component: () => import("../views/Show.vue"),
        props: true,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach(async (to, from, next) => {
    const currentUser = await getUser();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
        next("/");
    } else if (!requiresAuth && currentUser) {
        next("/home");
    } else {
        next();
    }
});

export default router;

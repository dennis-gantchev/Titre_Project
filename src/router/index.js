import { createRouter, createWebHistory } from "vue-router";
import Home from "./../views/Home.vue";
import SignIn from "./../views/SignIn.vue";
import Navigation from "./../views/Navigation.vue"
import Profile from "./../views/Profile.vue"
import AdminAccounts from "./../views/AdminAccounts.vue"
import AdminRoles from "./../views/AdminRoles.vue"
import AdminRequests from "./../views/AdminRequests.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/signin",
        name: "SignIn",
        component: SignIn,
    },
    {
        path:"/nav",
        name:"nav",
        component: Navigation
    },
    {
        path:"/account/profile",
        name:"profile",
        component: Profile
    },
    {
        path:"/admin/accounts",
        name:"admin-account",
        component: AdminAccounts

    },
    {
        path:"/admin/roles",
        name:"admin-roles",
        component: AdminRoles

    },
    {
        path:"/admin/requests",
        name:"admin-requests",
        component: AdminRequests

    }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
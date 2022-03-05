import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import SignIn from "./../views/auth/SignIn.vue";
import Navigation from "./../views/Navigation.vue"
import Profile from "../views/account/Profile.vue"
import AdminAccounts from "../views/admin/AdminAccounts.vue"
import AdminRoles from "../views/admin/AdminRoles.vue"
import AdminRequests from "../views/admin/AdminRequests.vue"
import AdminCreateAccount from "../views/admin/AdminCreateAccount.vue"
import AdminCreateRole from "../views/admin/AdminCreateRole.vue"
import RequestCreate from "../views/request/RequestCreate.vue"

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
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
        path:"/request/create",
        name:"request-create",
        component: RequestCreate
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
        path:"/admin/account/create",
        name:"admin-account-create",
        component: AdminCreateAccount
    },
    {
        path:"/admin/roles",
        name:"admin-roles",
        component: AdminRoles

    },
    {
        path:"/admin/role/create",
        name:"admin-role-create",
        component: AdminCreateRole
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
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import SignIn from "./../views/auth/SignIn.vue";
import Navigation from "./../views/Navigation.vue"
import Profile from "../views/account/Profile.vue"
import Edit from "../views/account/Edit.vue"
import AdminAccounts from "../views/admin/AdminAccounts.vue"
import AdminRoles from "../views/admin/AdminRoles.vue"
import AdminRequests from "../views/admin/AdminRequests.vue"
import AdminCreateAccount from "../views/admin/AdminCreateAccount.vue"
import AdminCreateRole from "../views/admin/AdminCreateRole.vue"
import RequestCreate from "../views/request/RequestCreate.vue"
import RequestComplete from "../views/request/RequestComplete.vue";
import Auth from "../utils/Auth";
import RequestInProgress from "../views/request/RequestInProgress.vue";
import RequestShow from "../views/request/RequestShow.vue";
import RequestEdit from "../views/request/RequestEdit.vue";
import RequestAgentProgress from "../views/request/RequestAgentProgress.vue";
import RequestAgentComplete from "../views/request/RequestAgentComplete.vue";
import RequestAgentShow from "../views/request/RequestAgentShow.vue";
import RequestAgentEdit from "../views/request/RequestAgentEdit.vue";
import P404 from '../views/error/P404.vue'
import P403 from '../views/error/P403.vue'
import P500 from '../views/error/P500.vue'
import GroupCreate from "../views/group/GroupCreate.vue";
import GroupIndex from "../views/group/GroupIndex.vue";
import GroupShow from "../views/group/GroupShow.vue";
const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
        meta : {
            requiresAuth: false,
            requireAgent: false,
            requireAdmin: false
        }
    },
    {
        path: "/signin",
        name: "SignIn",
        component: SignIn,
        meta : {
            requiresAuth: false,
            requireAgent: false,
            requireAdmin: false
        }
    },
    {
        path: "/group/create",
        name: "group-create",
        component: GroupCreate,
        meta: {
            requiresAuth: false,
            requireAgent: false,
            requireAdmin: false
        }
    },
    {
        path: "/group/index",
        name: "group-index",
        component: GroupIndex,
        meta: {
            requiresAuth: false,
            requireAgent: false,
            requireAdmin: false
        }
    },
    {
        path: "/group/show/:id",
        name: "group-show",
        component: GroupShow,
        meta: {
            requiresAuth: false,
            requireAgent: false,
            requireAdmin: false
        }

    },
    {
        path:"/request/create",
        name:"request-create",
        component: RequestCreate,
        meta:{
            requiresAuth: true,
            requireAgent: false,
            requireAdmin: false
        }
    },
    {
        path:"/request/progress",
        name:"request-progress",
        component: RequestInProgress,
        meta: {
            requiresAuth: true,
            requireAgent: false,
            requireAdmin: false
        }
    },
    {
        path:"/request/completed",
        name:"request-completed",
        component: RequestComplete,
        meta: {
            requiresAuth: true,
            requireAgent: false,
            requireAdmin: false
        }
    },
    {
        path:"/request/show/:id",
        name:"request-show",
        component: RequestShow,
        props: true,
        meta: {
            requiresAuth: true,
            requireAgent: false,
            requireAdmin: false
        }
    },
    {
        path:"/request/edit/:id",
        name:"request-edit",
        component: RequestEdit,
        props: true,
        meta: {
            requiresAuth: true,
            requireAgent: false,
            requireAdmin: false
        }
    },
    {
        path:"/request/agent/progress",
        name:"request-agent-progress",
        component: RequestAgentProgress,
        meta: {
            requiresAuth: true,
            requireAgent: true,
            requireAdmin: false
        }
    },
    {
        path:"/request/agent/completed",
        name:"request-agent-completed",
        component: RequestAgentComplete,
        meta: {
            requiresAuth: true,
            requireAgent: true,
            requireAdmin: false
        }
    },
    {
        path:"/request/agent/show/:id",
        name:"request-agent-show",
        component: RequestAgentShow,
        props: true,
        meta: {
            requiresAuth: true,
            requireAgent: true,
            requireAdmin: false
        }
    },
    {
        path:"/request/agent/edit/:id",
        name:"request-agent-edit",
        component: RequestAgentEdit,
        props: true,
        meta: {
            requiresAuth: true,
            requireAgent: true,
            requireAdmin: false
        }
    },
    {
        path:"/account/profile",
        name:"profile",
        component: Profile,
        meta : {
            requiresAuth: true,
            requireAgent: false,
            requireAdmin: false
        }
    },
    {
        path:"/account/edit",
        name:"edit-account",
        component: Edit,
        meta : {
            requiresAuth: true,
            requireAgent: false,
            requireAdmin: false
        }
    },
    {
      path:"/500",
      component: P500
    },
    {
        path:"/403",
        component: P403
    },
    {
        path:"/:pathMatch(.*)*",
        component: P404
    }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
    const auth = new Auth()
    console.log(to)
    if(to.meta.requiresAuth){
        const { roleLevel } = auth.getProfile()
        if(!auth.loggedIn()) {
            next({path: "/"})
        }

        if(to.meta.requireAgent){
            if(!roleLevel > 1){
                next({path: "/request/progress"})
            }
        }

        if(to.meta.requireAdmin){
            if(!roleLevel !== 3){
                next({path: "/request/progress"})
            }
        }

        next()
    }else{
        next()
    }





})
export default router;
<template>
    <div class="menu-mobile-container">
      <!-- logo -->
      <router-link to="/request/progress" class="menu-mobile-link">
        Service client
      </router-link>

      <!-- mobile menu button -->
      <button @click="onClickMenuMobile" class="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <section v-bind:class="showMenu === true ? 'section' : 'section-2' ">

        <div class="logo-container" >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span class="logo-title">Service client</span>
        </div>
        <nav>

            <div id="account" v-bind:class="activeLink['account'] === true ? 'active-link' : 'nav-link'" @click="onClickLink($event)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Mon compte</span>
            </div>
            <div v-show="activeLink['account'] === true" id="account-sub" class="nav-sub-link" >
                <router-link to="/account/profile" id="account-profile" @click="onClickSubLink" v-bind:class="activeSubLink['account-profile'] ? 'active-sub-link' : '' ">
                    Profile
                </router-link>
                <a id="account-logout" @click="onLogout" v-bind:class="activeSubLink['account-logout'] ? 'active-sub-link' : '' ">Déconnexion</a>
            </div>

            <div v-if="roleLevel === 3" id="admin" v-bind:class="activeLink['admin'] === true ? 'active-link' : 'nav-link'" @click="onClickLink">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span>Administration</span>
            </div>
            <div v-show="activeLink['admin'] === true" id="admin-sub" class="nav-sub-link" >
                <router-link to="/admin/accounts" id="admin-account" @click="onClickSubLink" v-bind:class="activeSubLink['admin-account'] ? 'active-sub-link' : '' ">Comptes</router-link>
                <router-link to="/admin/roles" id="admin-role" @click="onClickSubLink" v-bind:class="activeSubLink['admin-role'] ? 'active-sub-link' : '' ">Rôles</router-link>
                <router-link to="/admin/requests" id="admin-request" @click="onClickSubLink" v-bind:class="activeSubLink['admin-request'] ? 'active-sub-link' : '' ">Demandes</router-link>
            </div>
          <div id="group" v-bind:class="activeLink['group'] === true ? 'active-link' : 'nav-link'" @click="onClickLink">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <span>Groupe</span>
          </div>
          <div v-show="activeLink['group'] === true" id="group-sub" class="nav-sub-link" >
            <router-link to="/group/create" id="group-create" @click="onClickSubLink" v-bind:class="activeSubLink['group-create'] ? 'active-sub-link' : '' ">Créer</router-link>
            <router-link to="/group/index" id="group-list" @click="onClickSubLink" v-bind:class="activeSubLink['group-list'] ? 'active-sub-link' : '' ">Liste</router-link>
          </div>

            <div id="requests" v-bind:class="activeLink['requests'] === true ? 'active-link' : 'nav-link'" @click="onClickLink">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <span>Mes demandes</span>
            </div>
            <div v-show="activeLink['requests'] === true" id="requests-sub" class="nav-sub-link" >
                <router-link to="/request/create" id="requests-create" @click="onClickSubLink" v-bind:class="activeSubLink['requests-create'] ? 'active-sub-link' : '' ">Ajouter</router-link>
                <router-link to="/request/progress" id="requests-progress" @click="onClickSubLink" v-bind:class="activeSubLink['requests-progress'] ? 'active-sub-link' : '' ">En cours</router-link>
              <router-link to="/request/completed" @click="onClickSubLink" v-bind:class="activeSubLink['requests-finish'] ? 'active-sub-link' : '' ">Achever</router-link>
            </div>

            <div v-if="roleLevel > 1" id="ticket" v-bind:class="activeLink['ticket'] === true ? 'active-link' : 'nav-link'" @click="onClickLink">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <span>Tickets</span>
            </div>
            <div v-show="activeLink['ticket'] === true" id="ticket-sub" class="nav-sub-link">
                <router-link to="/request/agent/progress" id="ticket-progress" @click="onClickSubLink" v-bind:class="activeSubLink['ticket-progress'] ? 'active-sub-link' : '' ">En cours</router-link>
                <router-link to="/request/agent/completed" id="ticket-finish" @click="onClickSubLink" v-bind:class="activeSubLink['ticket-finish'] ? 'active-sub-link' : '' ">Achever</router-link>
            </div>

        </nav>
    </section>
   
</template>

<script>
import Auth from "../utils/Auth";

export default {
    data () {
        return {
            activeLink: {},
            activeSubLink:{},
            lastActiveLink: "",
            lastActiveSubLink: "",
            showMenu:true,
            roleLevel : null
        }

    },
    beforeMount() {
      const auth = new Auth()
      const { roleLevel } = auth.getProfile()
      this.roleLevel = roleLevel
    },
  methods:{
        onClickLink (event) {
            const { id } = event.currentTarget
            
            if(this.lastActiveLink){
                if(this.lastActiveLink === id){
                    this.activeLink[id] = false
                    this.lastActiveLink = ""
                }else{
                    this.activeLink[this.lastActiveLink] = false
                    this.lastActiveLink = id
                    this.activeLink[id] = true
                }
            }else{
                this.lastActiveLink = id
                this.activeLink[id] = true
            }
        },
        onClickSubLink (event){
            const { id } = event.currentTarget
            
            if(this.lastActiveSubLink){
            
                this.activeSubLink[this.lastActiveSubLink] = false
                this.lastActiveSubLink = id
                this.activeSubLink[id] = true
                
            }else{
                this.lastActiveSubLink = id
                this.activeSubLink[id] = true
            }
        },
        onClickMenuMobile(){

          if(this.showMenu){
            this.showMenu = false
          }else{
            this.showMenu = true
          }
          console.log(this.showMenu)
        },
        async onLogout(){
          const auth = new Auth()

          auth.logout()
          await this.$router.push("/")
        }

    }
}
</script>


<style lang="scss" scoped>
main {
    @apply 
    flex 
    flex-col 
    md:flex-row 
    min-h-screen 
    w-full;
}
nav{
    @apply
    space-y-2
}
a{
    @apply
    block 
    px-4 
    py-2 
    transition 
    duration-200 
    hover:bg-slate-600
}
.menu-mobile-container{
  @apply
  bg-slate-800
  text-blue-100
  flex
  justify-between
  md:hidden
}
.menu-mobile-link{
  @apply
  block
  p-4
  text-white
  font-bold
  self-center
}
.section{
  @apply
  bg-slate-900
  shadow
  text-blue-100
  w-64
  mx-0
  space-y-6
  py-7
  absolute
  inset-y-0
  left-0
  md:relative
  transform
  -translate-x-full
  md:relative
  md:translate-x-0
  transition
  duration-200
  ease-in-out
}
.section-2{
  @apply
  bg-slate-900
  shadow
  text-blue-100
  w-64
  mx-0
  space-y-6
  py-7
  absolute
  inset-y-0
  left-0
  md:relative
  transform
  -translate-x-full
  sm:absolute
  translate-x-0
  transition
  duration-200
  ease-in-out
}
.logo-container{
    @apply
    flex 
    items-center 
    space-x-2 
    px-4
}
.logo-title{
    @apply
    text-2xl 
    font-extrabold
}
.nav-link{
    @apply
    block 
    flex 
    px-4 
    space-x-2 
    py-2 
    rounded 
    mx-2 
    transition 
    duration-200 
    hover:bg-blue-500
    focus:bg-blue-500
}
.active-link{
    @apply
    block 
    flex 
    px-4 
    space-x-2 
    py-2 
    rounded 
    mx-2 
    transition 
    duration-200 
    bg-blue-500
}
.nav-sub-link{
    @apply
    text-slate-50 
    bg-slate-700 
    items-center 
    divide-y 
    divide-slate-600  
    transition-all 
    duration-200
}

.active-sub-link{
    @apply
    bg-slate-600
}
</style>
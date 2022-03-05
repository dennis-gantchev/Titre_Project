<template>
  <fragment>
    <main v-if="$route.path !== '/' && $route.path !== '/signin'">
      <Navigation />
      <router-view/>
    </main>
    <router-view v-else />
  </fragment>
</template>


<script>
import Login from './views/auth/Login.vue';
import SignIn from './views/auth/SignIn.vue';

import Navigation from './views/Navigation.vue';
export default{
  created () {
    console.log(this.$route);
  },
  components:{
    Navigation
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
  w-full
  bg-blue-50
}
</style>

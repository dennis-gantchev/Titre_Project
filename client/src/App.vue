<template>
  <main>
    <Navigation v-show="$route.path !== '/' && $route.path !== '/signin'"/>
    <router-view/>
  </main>
</template>


<script>
import Home from './views/Home.vue';
import SignIn from './views/SignIn.vue';

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

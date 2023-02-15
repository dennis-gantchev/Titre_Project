<template>
  <section>
    <h1>Mes Groupes</h1>
    <div class="p-3 shadow rounded-lg bg-slate-50 space-y-2">
      <h4 class="text-2xl text-bold">Groupe</h4>

      <div class="list-container">
        <span  v-for="(role, index) in roles" >
          <router-link :to="'/group/show/'+ role.Group.id">
            <article class="flex border shadow bg-slate-100 hover:bg-blue-200 hover:shadow-md mb-2 rounded-lg cursor-pointer">
              <div class=" basis-2/8  ">
                <img class=" h-full rounded-l-lg shadow-sm" v-bind:src="role.Group.image ? `http://localhost:3003/uploads/${role.Group.image}` :`http://localhost:3003/uploads/default-placeholder.png` " alt="" width="77" height="77"/>
              </div>
              <div class="basis-4/8 h-full w-full py-3">
                <div>
                  <h6 class="px-3 text-xl text-slate-800 font-semibold">{{role.Group.name}}</h6>
                  <p class="px-4 text-md text-slate-600">Votre rôle : <span class="font-medium text-blue-800">{{role.name}}</span></p>
                </div>
              </div>
            </article>
          </router-link>
        </span>
      </div>

    </div>
    <div class="pagination-container">
      <div class="pagination">
        <a  class="logo-before" @click="onClickBefore">
          <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </a>
        <div class="pagination-link-container">
            <span v-for="index in maxPage" :key="index">

              <a  v-bind:class=" index === page ? 'pagination-link-active' : 'pagination-link' " @click="onClickPage(index)">
                {{index}}
              </a>

            </span>


        </div>
        <a  class="logo-after" @click="onClickAfter">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import BackendService from "../../service/backend.service";

export default {
  name: "GroupIndex",
  data(){
    return{
      roles:null,
      page: 1,
      maxPage: 1,

    }
  },
  async beforeMount() {
    await this.getGroups()
  },
  methods: {
    async getGroups(){
      const response = await BackendService.get('group/index', `${this.page}`)
      if(response.ok){
        const { count, roles } = response
        this.roles = roles
        console.log(roles)
        this.maxPage = Math.ceil(count / 12)
        if(this.maxPage === 0){
          this.maxPage = 1
        }
        console.log(this.maxPage)

      }else{
        if(response.status === 500){
          await this.$router.push("/500")
        }

        if(response.status === 403){
          await this.$router.push("/403")
        }
      }

    },
    async onClickPage(index){
      this.page = index
      await this.getGroups()
    },
    async onClickBefore(){
      if(this.page !== 1){
        this.page -= 1
        await this.getGroups()
      }
    },
    async onClickAfter(){
      if(this.page !== this.maxPage){
        this.page +=1
        await this.getGroups()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
section{
  @apply
  flex-1
  p-10
  space-y-10
}
h1{
  @apply
  text-5xl
  text-slate-800
  font-bold
  font-sans
}
label{
  @apply
  text-slate-700
  after:ml-0.5
  after:text-red-500
  text-lg
}
.list-container{
  @apply


  grid grid-cols-3
  space-x-2
  justify-evenly
  sm:grid-cols-2
  md:grid-cols-3
}
.button-sky{
  @apply
  bg-sky-600
  text-white
  p-2
  shadow
  rounded-lg
  border
  hover:bg-sky-500
}
.pagination-container{
  @apply
  flex
  justify-end
}
.pagination{
  @apply
  flex
  space-x-2
}
.pagination-link-container{
  @apply
  flex
  space-x-2
  font-bold
}
.pagination-link{
  @apply
  block
  bg-slate-50
  shadow
  p-2
  transition
  cursor-pointer
  duration-200
  hover:bg-sky-600
  hover:text-white
}
.pagination-link-active{
  @apply
  block
  bg-sky-600
  text-white
  shadow
  p-2
  transition
  duration-200
  hover:bg-sky-600
  hover:text-white
}
.logo-before{
  @apply
  block
  bg-slate-50
  shadow
  p-2
  transition
  cursor-pointer
  duration-200
  hover:bg-sky-600
  hover:text-white
}
.logo-after{
  @apply
  block
  bg-slate-50
  shadow
  p-2
  transition
  duration-200
  cursor-pointer
  hover:bg-sky-600
  hover:text-white
}
.input{
  @apply

  py-1
  px-2
  rounded
  border
  border-slate-300
  shadow-sm
  hover:border-blue-500
  focus:outline-none
  focus:border-blue-500
  focus:ring-1
  focus:ring-blue-500
}
.input-group{
  @apply
  flex
  flex-col
  space-y-1
  w-full
}
</style>
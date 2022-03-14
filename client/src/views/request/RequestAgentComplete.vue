<template>
  <section>
    <h5>Tickets</h5>
    <div class="request-container">
      <h6 class="title">Demandes achevées</h6>
      <div class="card-container">
        <span v-if="requests.length !== 0" v-for="request in requests" :key="request.id">
          <article class="card">
            <div class="flex flex-col w-full">
              <div class="card-header">
                <h6 class="card-title">{{request.name}}</h6>
              </div>
              <div class="card-content">
                <span class="tag">{{request.role.name}}</span>
                <small class="date">Créée le {{request.createdAt }}</small>
                <router-link :to="'/request/agent/show/'+request.id"><button class="button-sky">Voir</button></router-link>
              </div>
            </div>
          </article>
        </span>
        <span v-else class="date p-1">Aucune demandes</span>
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
import DateUtils from "../../utils/DateUtils";
export default {
  data(){
    return{
      page: 1,
      maxPage: 1,
      requests: []
    }
  },
  async beforeMount(){
    await this.getRequest()

  },
  methods:{
    async onClickPage(index){
      this.page = index
      await this.getRequest()
    },
    async onClickBefore(){
      if(this.page !== 1){
        this.page -= 1
        await this.getRequest()
      }
    },
    async onClickAfter(){
      if(this.page !== this.maxPage){
        this.page +=1
        await this.getRequest()
      }
    },
    async getRequest(){
      const response = await BackendService.get('request/agent/completed', `${this.page}`)
      console.log(response)
      if(response.ok){
        const { requests } = response

        this.requests = requests.rows.map((request) => {
          request.createdAt = DateUtils.convert(request.createdAt)
          return request
        })
        this.maxPage = Math.ceil(requests.count / 4)
        if(this.maxPage === 0){
          this.maxPage = 1
        }
      }else{
        if(response.status === 500){
          await this.$router.push("/500")
        }

        if(response.status === 403){
          await this.$router.push("/403")
        }
      }
    }
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
h5 {
  @apply
  font-bold
  text-5xl
  text-slate-800
}
.tag{
  @apply
  inline-block
  bg-gray-200
  rounded-full
  px-3
  py-1
  text-sm
  font-semibold
  text-gray-700
  mr-2
  mb-2
  hover:bg-sky-800
  hover:text-white
}
.title{
  @apply
  font-bold
  text-3xl
  text-slate-50
  bg-slate-800
  rounded-tr-lg
  rounded-tl-lg
  p-1
}
.request-container{
  @apply
  bg-slate-50
  shadow
  rounded
  min-w-full
  space-y-2
  transition
  duration-200
}
.card-container{
  @apply
  flex
  flex-col
}
.card-header{
  @apply
  flex
  justify-center
  p-5
}
.card-title{
  @apply
  text-xl
  font-bold
}
.card-content{
  @apply
  flex
  justify-between
  px-2
  my-1
}
.card{
  @apply
  flex
  border
  rounded-lg
  shadow m-2
  hover:shadow-lg
  hover:bg-gray-100
}
.date{
  @apply
  text-sm
  text-gray-500
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
</style>
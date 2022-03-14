<template>
  <section>
    <h4>Demande</h4>
    <div class="request-container">
      <div class="request-title">
        <h5 class="title">{{request.name}}</h5>

      </div>
      <div class="content">
        {{request.content}}
      </div>
      <div>
        <p class="">Status:
          <span v-if="request.resolved" class="status-resolved">Résolu</span>
          <span v-else class="status-unresolved">En cours</span>
        </p>
      </div>
      <div class="date-container">
        <small class="date">Créée le {{request.createdAt}}</small>
        <small class="date">Modifiée le {{request.updatedAt}} </small>
      </div>
    </div>

    <div class="button-container">
      <router-link :to="'/request/edit/'+request.id"><button class="button-sky">
        Modifier
      </button></router-link>
      <button @click="onDelete" class="button-rose">
        Supprimer
      </button>
    </div>
  </section>
</template>

<script>
import BackendService from "../../service/backend.service";
import Auth from "../../utils/Auth";
import DateUtils from "../../utils/DateUtils";

export default {

  data(){
    return {
      request: {},
      roleLevel: null
    }
  },
  async beforeMount(){
    const response = await BackendService.get('request/show',this.$route.params.id)
    if(response.ok){
      const auth = new Auth()
      const { roleLevel } = auth.getProfile()
      const { request } = response
      this.roleLevel = roleLevel
      request.createdAt = DateUtils.convert(request.createdAt)
      request.updatedAt = DateUtils.convert(request.updatedAt)
      this.request = request
    }else{
      if(response.status === 500){
        await this.$router.push("/500")
      }

      if(response.status === 403){
        await this.$router.push("/403")
      }
    }
  },
  methods:{
    async onDelete(){
      const response = await BackendService.delete('request/delete', this.request.id)

      if(response.ok){
        await this.$router.push("/request/progress")
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
h4{
  @apply
  text-slate-800
  text-5xl
  font-bold
}
.request-container{
  @apply
  flex
  flex-col
  bg-slate-50
  rounded-lg
  shadow
  p-3

  space-y-5
}
.title-container{
  @apply
  flex
  justify-between
}
.title{
  @apply
  text-2xl
  text-slate-800
  font-bold
}
.content{
  @apply
  border
  rounded-lg
  bg-gray-50
  p-2 w-full
  shadow-inner
}
.status-resolved{
  @apply
  text-emerald-500
}
.status-unresolved{
  @apply
  text-rose-500
}
.date-container{
  @apply
  flex
  justify-between
}
.date{
  @apply
  text-gray-400
}
.button-container{
  @apply
  flex
  justify-between
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

.button-rose{
  @apply
  bg-rose-600
  text-white
  p-2
  shadow
  rounded-lg
  border
  hover:bg-rose-500
}

.button-emerald{
  @apply
  bg-emerald-600
  text-white
  p-2
  shadow
  rounded-lg
  border
  hover:bg-emerald-500
}
</style>
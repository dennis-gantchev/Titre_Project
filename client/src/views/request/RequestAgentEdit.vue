<template>
  <section>
    <h5>Nouvelle demande</h5>
    <div class="form-container">
      <form @submit.prevent="onSubmit" method="POST">
        <div class="form-group">
          <div class="input-group">
            <label for="title">Titre</label>
            <input
                type="text"
                name="title"
                v-model="request.name"
                v-bind:class="errors.name.length && request.name === lastRequest.name ? 'errors-input': 'input'"
            />
            <div v-if="errors.name.length" class="errors-container">
                <span v-for="error in errors.name" v-bind:key="error">
                    <small>- {{error}}</small>
                </span>
            </div>
          </div>
          <div class="input-group">
            <label for="role">Rôle</label>
            <select
                name="role"
                v-model="request.roleId"
                class="input"
            >
              <option v-for="role in roles" v-bind:key="role.id" :value="role.id">{{role.name}}</option>
            </select>
            <div v-if="errors.roleId.length" class="errors-container">
              <span v-for="error in errors.role" v-bind:key="error">
                  <small>- {{error}}</small>
              </span>
            </div>
          </div>
        </div>
        <div class="input-group">
          <label for="content">Contenu</label>
          <textarea
              name="content"
              cols="30"
              rows="10"
              v-model="request.content"
              v-bind:class="errors.content.length && request.content === lastRequest.content ? 'errors-input': 'input' "
          >

          </textarea>
          <div v-if="errors.content.length" class="errors-container">
              <span v-for="error in errors.content" v-bind:key="error">
                  <small>- {{error}}</small>
              </span>
          </div>
        </div>
        <div class="button-container">
          <button class="button-sky" type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import RequestService from './../../service/request.service'
import BackendService from "../../service/backend.service";
export default {
  data(){
    return{
      request: {
        name:"",
        roleId: "",
        content: ""
      },
      lastRequest: {
        name:"",
        roleId: "",
        content: ""
      },
      errors: {
        name:[],
        roleId: [],
        content: []
      },
      roles: []

    }
  },
  async beforeMount() {

    const response = await BackendService.get('request/agent/edit',this.$route.params.id)
    console.log(response)
    if(response.ok){
      const { roles, request } = response
      this.roles = roles
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
  methods: {
    async onSubmit(){
      console.log(this.request)

      const errors = RequestService.validate(this.request, this.roles)

      if(errors){
        this.errors = errors
        this.lastRequest = JSON.parse(JSON.stringify(this.request))
      }else{
        this.response = await BackendService.put('request/agent/update', this.request)
        if(this.response.ok){
          await this.$router.push("/request/agent/show/"+this.$route.params.id)
        }else{
          if(this.response.status === 500){
            await this.$router.push("/500")
          }

          if(this.response.status === 403){
            await this.$router.push("/403")
          }
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
h5{
  @apply
  text-5xl
  text-slate-800
  font-bold
  font-sans
}
form{
  @apply
  flex
  flex-col
  space-y-3
}
label{
  @apply
  text-slate-700
  after:content-['*']
  after:ml-0.5
  after:text-red-500
  text-lg
}
.input{
  @apply
  w-full
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
.select{
  @apply
  w-full
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
.textarea{
  @apply
  w-full
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
.errors-container{
  @apply
  flex
  flex-col
  p-1
  rounded
  border-pink-500
  bg-pink-100
  text-pink-600
}
.errors-input{
  @apply
  w-full
  py-1
  px-2
  rounded
  border
  border-pink-300
  shadow-sm
  focus:outline-none
  focus:ring-1
  border-pink-500
  text-pink-600
  focus:border-pink-500
  focus:ring-pink-500
}

.form-container{
  @apply
  bg-slate-50
  p-3
  shadow
  rounded-lg
}
.input-group{
  @apply
  flex
  flex-col
  space-y-1
  w-full
}
.form-group{
  @apply
  flex
  flex-col
  md:flex-row
  justify-around
  md:space-x-2
}
.button-container{
  @apply
  flex
  justify-end
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
</style>
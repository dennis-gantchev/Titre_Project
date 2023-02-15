<template>
  <section>
    <h5>Nouveau groupe</h5>
    <div class="form-container">
      <form @submit.prevent="onSubmit" method="POST" enctype="multipart/form-data">
        <h1 class="text-bold text-2xl">Groupe</h1>
        <div class="form-group">
          <div class="input-group">
            <label for="title">Nom</label>
            <input
                type="text"
                name="title"
                v-model="group.name"
                v-bind:class="errors && errors.name.length ? 'errors-input': 'input'"
            />
            <div v-if="errors && errors.name.length" class="errors-container">
              <span v-for="error in errors.name" v-bind:key="error">
                  <small>- {{error}}</small>
              </span>
            </div>
          </div>
          <div class="input-group">
            <label for="image">Image</label>
            <input
                class="input-file"
                type="file"
                name="image"
                @change="upload"
                v-bind:class="errors && errors.image.length ? 'errors-input-file': 'input-file'"
            />
            <div v-if="errors && errors.image.length" class="errors-container">
              <span v-for="error in errors.image" v-bind:key="error">
                  <small>- {{error}}</small>
              </span>
            </div>
          </div>

        </div>
        <div class="form-group">
          <div class="input-group">
            <label for="description">Description</label>
            <textarea class="textarea" name="description" v-model="group.description" />
          </div>
        </div>
        <h1 class="text-bold text-2xl">Rôles</h1>
        <div class="form-group">
          <div class="flex justify-start w-full space-x-2">
            <label for="defaultRole">Rôle par default</label>
            <input class="" type="checkbox" name="defaultRole" v-model="isDefaultRole"/>
          </div>
        </div>
        <div class="form-group" v-for="(role, index) in roles" v-bind:key="index">
          <RoleForm v-bind:disabled="index === 0 ? true : isDefaultRole" v-bind:role="role" v-bind:errors="errorRoles[index]" v-bind:form-index="index" @deleteRole="deleteRole"/>
        </div>
        <div class="flex justify-start">
          <button class="button-emerald" @click="addRole" v-bind:disabled="isDefaultRole">Ajouter</button>
        </div>
        <div class="button-container">
          <button class="button-sky" type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import RequestService from "../../service/request.service";
import BackendService from "../../service/backend.service";
import RoleForm from "../../components/group/RoleForm.vue";
import GroupService from "../../service/group.service";
import RoleService from "../../service/role.service";
export default {
  name: "GroupCreate",
  components: {RoleForm},
  data() {
    return {
      group: {
        name: "",
        image: "",
        description: ""
      },
      lastRoles: [],
      errors: {
        name: [],
        image: [],
        description: []
      },
      errorRole: {
        name: []
      },
      errorRoles: [this.errorRoles,this.errorRoles, this.errorRoles],
      roles: [
          {
            name: "Responsable",
            canInviteMember: true,
            canBanMember: true,
            canAssignRole: true,
            canCreateRole: true,
            canEditGroupTicket: true,
            canDeleteGroupTicket: true,
            canAssignTicket: true,
            canManageTicket: true,
            canResolveTicket: true
          },
        {
          name: "Manager",
          canInviteMember: false,
          canBanMember: false,
          canAssignRole: false,
          canCreateRole: false,
          canEditGroupTicket: true,
          canDeleteGroupTicket: true,
          canAssignTicket: true,
          canManageTicket: true,
          canResolveTicket: true
        },
        {
          name: "Membre",
          canInviteMember: false,
          canBanMember: false,
          canAssignRole: false,
          canCreateRole: false,
          canEditGroupTicket: false,
          canDeleteGroupTicket: false,
          canAssignTicket: false,
          canManageTicket: true,
          canResolveTicket: true
        }
      ] ,
      isDefaultRole: true
    }
  },
  methods: {
    async onSubmit(e) {
      this.errors = GroupService.validate(this.group)
      this.errorRoles = this.roles.map(role => RoleService.validate(role))
      console.log(this.errorRoles.filter(error => error !== null).length)
      console.log(this.errors)
      if(!this.errors && !this.errorRoles.filter(error => error !== null).length){
        this.group.roles = this.roles
        this.response = await BackendService.postWithFile('group/create', this.group)
        console.log(this.response)
        if(this.response.ok){

        }
      }
      //const errors = RequestService.validate(this.request, this.roles)

      // if(errors){
      //   this.errors = errors
      //   this.lastRequest = JSON.parse(JSON.stringify(this.request))
      // }else{
      //   this.response = await BackendService.post('request/create', this.request)
      //   if(this.response.ok){
      //     await this.$router.push("/request/progress")
      //   }else{
      //     if(this.response.status === 500){
      //       await this.$router.push("/500")
      //     }
      //
      //     if(this.response.status === 403){
      //       await this.$router.push("/403")
      //     }
      //   }
      // }
    },
    upload(e){
      console.log(e.target.files)
      this.group.image = e.target.files[0]
    },
    addRole(){
      this.roles.push({
        name:"",
        canInviteMember: false,
        canBanMember: false,
        canAssignRole: false,
        canCreateRole: false,
        canEditGroupTicket: false,
        canDeleteGroupTicket: false,
        canAssignTicket: false,
        canManageTicket: true,
        canResolveTicket: true
      })
    },
    deleteRole(index){
      this.roles.splice(index, 1)
      console.log(index)
      console.log(this.roles)
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
.input-file{
  @apply
  w-full
  file:py-1.5
  file:px-4
  rounded
  border
  bg-white
  file:border
  file:border-blue-900
  file:bg-blue-900
  file:text-white
  file:shadow-sm
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
.errors-input-file{
  @apply
  w-full
  file:py-1.5
  file:px-2
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
.button-emerald{
  @apply
  bg-emerald-600
  text-white
  p-2
  shadow
  rounded-lg
  border
  hover:bg-emerald-500
  disabled:bg-gray-300
}
</style>
<template>
  <section>
    <h1>Nouveau groupe</h1>
    <div class="form-container">
      <form @submit.prevent="onSubmit" method="POST" enctype="multipart/form-data">
        <h2>Groupe</h2>
        <div class="form-group">
          <div class="input-group">
            <label class="mandatory" for="title">Nom</label>
            <input
                type="text"
                name="title"
                v-model="group.name"
                v-bind:class="errors && errors.name.length ? 'errors-input': ''"
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
                class=""
                type="file"
                name="image"
                @change="upload"
                v-bind:class="errors && errors.image.length ? 'errors-input-file': ''"
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
        <h2>Rôles</h2>
        <div class="form-group">
          <div class="flex justify-start w-full space-x-2">
            <label for="defaultRole">Rôle par default</label>
            <input class="" type="checkbox" name="defaultRole" v-model="isDefaultRole"/>
          </div>
        </div>
        <div class="form-group" v-for="(role, index) in roles" v-bind:key="index">
          <RoleForm v-bind:disabled="index === 0 ? true : isDefaultRole" v-bind:role="role" v-bind:errors="errorRoles[index]" v-bind:form-index="index" @deleteRole="deleteRole"/>
        </div>
        <div class="text-right">
          <button class="button-emerald" @click="addRole" v-bind:disabled="isDefaultRole">Ajouter un rôle</button>
        </div>
        <div class="text-right">
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
@import "src/assets/style/base";
@import "src/assets/style/button";
@import "src/assets/style/form";

</style>
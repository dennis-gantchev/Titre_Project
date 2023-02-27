<template>
  <div class="flex">
    <vue-final-modal v-model="onAddRole" content-class="h-full flex">
      <div class="relative bg-white w-[35%] mx-auto my-auto p-3 rounded shadow space-y-3">
        <div class="flex justify-between">
          <h2>Nouveau rôle</h2>
          <svg @click="onClickClose" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg text-rose-600 cursor-pointer" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </div>
        <div class="space-y-1">
          <label class="mandatory">Nom</label>
          <input v-bind:class="errors ?'errors-input':'input' " type="text" v-bind:name="'roleName'" v-model="role.name" v-bind:disabled="disabled"/>
          <div v-if="errors && errors.name.length" class="errors-container">
              <span v-for="error in errors.name" v-bind:key="error">
                  <small>- {{error}}</small>
              </span>
          </div>
        </div>
        <div class="flex">
          <div class="p-2 w-full">
            <h4 class="font-medium text-lg">Administration</h4>
            <div class="flex text-center">

              <div class="input-group basis-1/5">
                <label class="block">Inviter des membres</label>
                <div class="">
                  <input type="checkbox" v-bind:name="'canInviteMember'" v-model="role.canInviteMember" v-bind:disabled="disabled"/>
                </div>
              </div>
              <div class="input-group basis-1/5">
                <label>Bannir un membre</label>
                <input type="checkbox" v-bind:name="'canBanMember'" v-model="role.canBanMember" v-bind:disabled="disabled"/>
              </div>
              <div class="input-group basis-1/5">
                <label>Assigner un rôle</label>
                <input type="checkbox" v-bind:name="'canAssignRole'" v-model="role.canAssignRole" v-bind:disabled="disabled"/>
              </div>
              <div class="input-group basis-1/5">
                <label>Création de rôles</label>
                <input type="checkbox" v-bind:name="'canCreateRole'" v-model="role.canCreateRole" v-bind:disabled="disabled"/>
              </div>
            </div>
            <h4 class="font-medium text-lg">Management</h4>
            <div class="flex text-center">

              <div class="input-group basis-1/5">
                <label class="block">Modifier des tickets</label>
                <input type="checkbox" v-bind:name="'canEditGroupTicket'" v-model="role.canEditGroupTicket" v-bind:disabled="disabled"/>
              </div>

              <div class="input-group basis-1/5">
                <label>Suppression des tickets</label>
                <input type="checkbox" v-bind:name="'canDeleteGroupTicket'" v-model="role.canDeleteGroupTicket" v-bind:disabled="disabled"/>
              </div>
              <div class="input-group basis-1/5">
                <label>Assigner un ticket</label>
                <input type="checkbox" v-bind:name="'canAssignTicket'" v-model="role.canAssignTicket" v-bind:disabled="disabled"/>
              </div>

            </div>
            <h4 class="font-medium text-lg">Utilisation</h4>
            <div class="flex text-center">
              <div class="input-group basis-1/5">
                <label class="block">Gérer ses tickets</label>
                <input type="checkbox" v-bind:name="'canManageTicket'" v-model="role.canManageTicket" v-bind:disabled="true"/>
              </div>
              <div class="input-group basis-1/5">
                <label>Résolution d'un ticket</label>
                <input type="checkbox" v-bind:name="'canResolveTicket'" v-model="role.canResolveTicket"/>
              </div>
              <div v-if="errors && errors.permission.length" class="errors-container">
                <span v-for="error in errors.permission" v-bind:key="error">
                    <small>- {{error}}</small>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right">
          <button class="bg-blue-900 py-2 px-2 text-white rounded" @click="onSendRole">Envoyer</button>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import {ModalsContainer, VueFinalModal} from "vue-final-modal";
import RoleService from "../../service/role.service";
import BackendService from "../../service/backend.service";
export default {
  name: "newRoleForm",
  components: {VueFinalModal, ModalsContainer},
  props: ['onAddRole', 'oldRole', 'GroupId'],
  beforeMount() {
    console.log(this.oldRole)
  },
  data(){
    return{
      disabled: false,
      role: this.oldRole ? JSON.parse(JSON.stringify(this.oldRole)) : {
        name: "",
        canInviteMember: false,
        canBanMember: false,
        canAssignRole: false,
        canCreateRole: false,
        canEditGroupTicket: false,
        canDeleteGroupTicket: false,
        canAssignTicket: false,
        canManageTicket: true,
        canResolveTicket:false,
        GroupId: this.GroupId
      },
      errors: null
    }
  },
  methods: {
    onClickClose(){
      this.$emit('onClickStopModal')
    },
    onSendRole(){
      console.log(this.role)
      this.errors = RoleService.validate(this.role)

      if(!this.errors){
        const response = BackendService.post('role/create', this.role)
      }
      console.log(this.errors)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/base";
@import "src/assets/style/button";
@import "src/assets/style/form";
</style>
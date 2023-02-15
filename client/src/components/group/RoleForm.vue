<template>
  <div class="flex flex-col w-full rounded shadow space-y-2 p-2 bg-slate-100">
    <div v-if="!disabled" class="flex justify-end">
      <svg @click="remove" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg cursor-pointer h-5 w-5 text-red-700" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
    </div>
    <div class="space-y-1">
      <label class="label_mandatory">Nom</label>
      <input v-bind:class="errors ?'errors-input':'input' " type="text" v-bind:name="'roleName'+formIndex" v-model="role.name" v-bind:disabled="disabled"/>
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
              <input type="checkbox" v-bind:name="'canInviteMember'+ formIndex" v-model="role.canInviteMember" v-bind:disabled="disabled"/>
            </div>
          </div>
          <div class="input-group basis-1/5">
            <label>Bannir un membre</label>
            <input type="checkbox" v-bind:name="'canBanMember'+ formIndex" v-model="role.canBanMember" v-bind:disabled="disabled"/>
          </div>
          <div class="input-group basis-1/5">
            <label>Assigner un rôle</label>
            <input type="checkbox" v-bind:name="'canAssignRole'+formIndex" v-model="role.canAssignRole" v-bind:disabled="disabled"/>
          </div>
          <div class="input-group basis-1/5">
            <label>Création de rôles</label>
            <input type="checkbox" v-bind:name="'canCreateRole'+ formIndex" v-model="role.canCreateRole" v-bind:disabled="disabled"/>
          </div>
        </div>
        <h4 class="font-medium text-lg">Management</h4>
        <div class="flex text-center">

          <div class="input-group basis-1/5">
            <label class="block">Modifier des tickets</label>
            <input type="checkbox" v-bind:name="'canEditGroupTicket'+ formIndex" v-model="role.canEditGroupTicket" v-bind:disabled="disabled"/>
          </div>

          <div class="input-group basis-1/5">
            <label>Suppression des tickets</label>
            <input type="checkbox" v-bind:name="'canDeleteGroupTicket'+ formIndex" v-model="role.canDeleteGroupTicket" v-bind:disabled="disabled"/>
          </div>
          <div class="input-group basis-1/5">
            <label>Assigner un ticket</label>
            <input type="checkbox" v-bind:name="'canAssignTicket'+ formIndex" v-model="role.canAssignTicket" v-bind:disabled="disabled"/>
          </div>

        </div>
        <h4 class="font-medium text-lg">Utilisation</h4>
        <div class="flex text-center">
          <div class="input-group basis-1/5">
            <label class="block">Gérer ses tickets</label>
            <input type="checkbox" v-bind:name="'canManageTicket'+ formIndex" v-model="role.canManageTicket" v-bind:disabled="true"/>
          </div>
          <div class="input-group basis-1/5">
            <label>Résolution d'un ticket</label>
            <input type="checkbox" v-bind:name="'canResolveTicket'+ formIndex" v-model="role.canResolveTicket" v-bind:disabled="disabled"/>
          </div>
          <div v-if="errors && errors.permission.length" class="errors-container">
              <span v-for="error in errors.permission" v-bind:key="error">
                  <small>- {{error}}</small>
              </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleForm",
  props: ["role", "errors","formIndex", "disabled","deleteRole"],
  methods:{
    remove(){
      this.$emit("deleteRole",this.formIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
label{
  @apply
  text-slate-700
  text-lg
}
.label_mandatory{
  @apply
  after:content-['*']
  after:ml-0.5
  after:text-red-500
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
  disabled:bg-slate-200
  disabled:text-gray-600
  disabled:border
}
.input-group{
  @apply
  flex
  flex-col
  space-y-1
  w-full
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
</style>
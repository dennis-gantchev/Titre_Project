<template>
    <div class="space-y-2">
      <button class="bg-blue-900 py-2 px-2 rounded text-white" @click="onClickAddRole">Ajouter Rôle</button>
      <NewRoleForm :onAddRole="onAddRole" :oldRole="null" @onClickStopModal="onClickStopModal"/>
      <div class="space-x-2 flex overflow-auto">
        <div :class="role.id !== roleSelected ? 'bg-slate-100 p-2 shadow-md rounded flex-col cursor-pointer hover:bg-blue-100 hover:shadow-lg' : 'bg-blue-200 p-2 shadow rounded flex-col cursor-pointer shadow-lg'" v-for="(role, index) in roles" v-bind:key="index" @click="onClickRole(role.id)">
          <p><strong>{{role.name}}</strong></p>
          <div class="grid md:grid-cols-3 sm:grid-cols-2  p-1 justify-between">
            <div class="flex-col text-center">
              <p>Inviter des membres </p>
              <i v-if="role.canInviteMember" class="bi bi-check2 text-emerald-600"></i>
              <i v-else class="bi bi-x text-rose-600"></i>
            </div>
            <div class="flex-col text-center">
              <p>Bannir un membre </p>
              <i v-if="role.canBanMember" class="bi bi-check2 text-emerald-600"></i>
              <i v-else class="bi bi-x text-rose-600"></i>
            </div>
            <div class="flex-col text-center">
              <p>Assigner un rôle </p>
              <i v-if="role.canAssignRole" class="bi bi-check2 text-emerald-600"></i>
              <i v-else class="bi bi-x text-rose-600"></i>
            </div>
            <div class="flex-col text-center">
              <p>Créer un rôle </p>
              <i v-if="role.canCreateRole" class="bi bi-check2 text-emerald-600"></i>
              <i v-else class="bi bi-x text-rose-600"></i>
            </div>
            <div class="flex-col text-center">
              <p>Modifier un ticket </p>
              <i v-if="role.canEditGroupTicket" class="bi bi-check2 text-emerald-600"></i>
              <i v-else class="bi bi-x text-rose-600"></i>
            </div>
            <div class="flex-col text-center">
              <p>Supprimer un ticket </p>
              <i v-if="role.canDeleteGroupTicket" class="bi bi-check2 text-emerald-600"></i>
              <i v-else class="bi bi-x text-rose-600"></i>
            </div>
            <div class="flex-col text-center">
              <p>Assigner un ticket </p>
              <i v-if="role.canAssignTicket" class="bi bi-check2 text-emerald-600"></i>
              <i v-else class="bi bi-x text-rose-600"></i>
            </div>
            <div class="flex-col text-center">
              <p>Résoudre un ticket </p>
              <i v-if="role.canResolveTicket" class="bi bi-check2 text-emerald-600"></i>
              <i v-else class="bi bi-x text-rose-600"></i>
            </div>
            <div class="flex-col text-center">
              <p>Gérer ses tickets </p>
              <i v-if="role.canManageTicket" class="bi bi-check2 text-emerald-600"></i>
              <i v-else class="bi bi-x text-rose-600"></i>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import NewRoleForm from "../group/NewRoleForm.vue";

export default {
  name: "RoleList",
  components: {NewRoleForm},
  props: ['roles'],
  data(){
    return {
      roleSelected: null,
      onAddRole:false
    }
  },
  methods: {
    onClickAddRole(){
      this.onAddRole = true
    },
    onClickRole(id){
      this.roleSelected = id
    },
    onClickStopModal(){
      this.onAddRole = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/base";
@import "src/assets/style/button";
@import "src/assets/style/form";
</style>
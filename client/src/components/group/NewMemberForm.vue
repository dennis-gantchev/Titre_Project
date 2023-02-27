<template>
  <div class="flex">
    <vue-final-modal v-model="onAddMember" content-class="h-full flex">
      <div class="relative bg-white w-[35%] mx-auto my-auto p-3 rounded shadow space-y-3">
        <div class="flex justify-between">
          <h2>Nouveau membre</h2>
          <svg @click="onClickStopAddMember" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg text-rose-600 cursor-pointer" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </div>

        <form @submit.prevent="onSendNewMember">
          <div class="space-y-3 relative">
            <label class="mandatory">Utilisateur</label>
            <input type="email" v-model="email" placeholder="Email"/>
            <div v-if="errors && errors.email.length" class="errors-container">
                    <span v-for="error in errors.email" v-bind:key="error">
                        <small>- {{error}}</small>
                    </span>
            </div>
            <div class="absolute bg-slate-50 w-full flex-col border-b cursor-pointer overflow-auto shadow " v-if="currentSearchAccount.length">
              <div class="w-full flex py-1 border-b hover:bg-blue-100 px-1" v-for="acc in currentSearchAccount" @click="onClickMember(acc.email)">
                <img class="h-full rounded-full shadow-sm my-auto" src="http://localhost:3003/uploads/default-placeholder.png" alt="" width="65" height="65"/>
                <div>
                  <p><strong>{{acc.firstName}} {{acc.lastName}}</strong></p>
                  <p class="font-medium">{{acc.email}}</p>
                </div>
              </div>
            </div>
            <h3>Role</h3>
            <div class="space-y-2 flex-col overflow-auto">
              <div :class="role.id !== roleSelected ? 'bg-slate-100 p-2 shadow rounded flex-col cursor-pointer hover:bg-blue-100 hover:shadow-lg' : 'bg-blue-200 p-2 shadow rounded flex-col cursor-pointer shadow-lg'" v-for="(role,name) in roles" @click="onClickRole(role.id)">
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
            <div v-if="errors && errors.role.length" class="errors-container">
                      <span v-for="error in errors.role" v-bind:key="error">
                          <small>- {{error}}</small>
                      </span>
            </div>
            <div class="text-right">
              <button type="submit" class="bg-blue-900 py-2 px-2 text-white rounded shadow">Envoyer</button>
            </div>
          </div>
        </form>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import {ModalsContainer, VueFinalModal} from "vue-final-modal";
import GroupService from "../../service/group.service";
import BackendService from "../../service/backend.service";

export default {
  name: "NewMemberForm",
  components: {VueFinalModal, ModalsContainer},
  props: ['onAddMember', 'roles', 'accounts', 'groupId', "newMemberSend"],
  data(){
    return{
      email: null,
      errors: {
        email: [],
        role: []
      },
      roleSelected: null,
      newMemberId: null,
      memberSelected: false,
      currentSearchAccount: []
    }
  },
  watch: {
    email(newEmail, oldMemberEmail){
      this.currentSearchAccount = []
      this.newMemberId = null

      if(!newEmail){
        this.currentSearchAccount = []
        return
      }

      if(this.memberSelected){
        this.currentSearchAccount = []
        this.memberSelected = false
        return
      }
      for(let account of this.accounts){
        let isSame = false
        for(let property in account){
          if(account[property].includes(newEmail)){
            isSame = true
          }
        }

        if(isSame){
          this.currentSearchAccount.push(account)
        }
        console.log(isSame)
      }

      console.log(this.currentSearchAccount)

    }
  },
  methods: {
    async onSendNewMember(){
      const errors = GroupService.validateNewMember(this.email, this.roleSelected)
      console.log(errors)
      if(errors){
        this.errors = errors
      }else{
        const response = await BackendService.post('group/addMember', {email: this.email, id: this.groupId, roleId: this.roleSelected})
        this.$emit("memberIsSend")
        this.$emit('onClickStopAddMember')
        console.log(response)
      }
    },
    onClickMember (email, id){

      this.email = email
      this.memberSelected = true
    },
    onClickRole(roleId){
      this.roleSelected = roleId
    },
    onClickStopAddMember(){
      this.$emit('onClickStopAddMember')
    }

  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/base";
@import "src/assets/style/button";
@import "src/assets/style/form";
</style>
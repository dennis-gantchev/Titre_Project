<template>
  <section>
    <h1>Groupe</h1>
    <article v-if="group">
      <h2>Information</h2>
      <div class="space-y-2">
        <div class="flex space-x-3">
          <img class=" h-full rounded-lg shadow-sm" v-bind:src="group.image ? `http://localhost:3003/uploads/${group.image}` :`http://localhost:3003/uploads/default-placeholder.png` " alt="" width="77" height="77"/>
          <div class="w-full">
            <h5 class="p-1">Nom</h5>
            <p class=" p-1 rounded-lg">{{group.name}}</p>
          </div>
        </div>
        <div class="space-y-1">
          <h5 class="p-1">Créer le</h5>
          <p class=" p-1 rounded-lg">{{group.createdAt}}</p>
        </div>
        <div class="space-y-1">
          <h5 class="p-1">Description</h5>
          <p class=" inline-block p-1 mb-1 rounded-lg" v-for="description in group.description">{{description}}</p>
        </div>
      </div>

      <h2>Membres</h2>
      <div class="space-y-5">
        <MemberList :members="members" :accounts="accounts" :groupId="group.id" :roles="roles" @newMemberSend="newMemberSend"/>
      </div>
      <h2>Roles</h2>
      <div class="form-group" v-for="(role, index) in roles" v-bind:key="index">
        <RoleForm v-bind:role="role" v-bind:errors="errorRoles[index]" v-bind:form-index="index" @deleteRole="deleteRole"/>
      </div>
    </article>
  </section>
</template>

<script>
import BackendService from "../../service/backend.service";
import Auth from "../../utils/Auth";
import DateUtils from "../../utils/DateUtils";
import MemberList from "../../components/list/MemberList.vue";
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import "bootstrap-icons/font/bootstrap-icons.css";
import GroupService from "../../service/group.service";
import RoleForm from "../../components/group/RoleForm";


export default {
  name: "GroupShow",
  components: {
    RoleForm,
    MemberList, VueFinalModal,
    ModalsContainer
  },
  data() {
    return {
      errors: null,
      group: null,
      permission: null,
      roles: null,
      countMember: null,
      members: [],
      accounts: null,
    }
  },

  async beforeMount() {
    await this.getData()
  },
  methods: {
    async getData() {
      console.log(this.$route.params.id)
      const response = await BackendService.get('group/show', this.$route.params.id)
      if (response.ok) {
        console.log(response)
        const {group, permission, roles, countMember, members, accounts} = response
        this.group = group
        if(this.group.description){
          this.group.description = this.group.description.split('\n').filter(item => item !== "")
        }
        this.group.createdAt = DateUtils.convert(this.group.createdAt)
        console.log(this.group)
        this.permission = permission
        this.roles = roles
        this.countMember = countMember
        this.members = members
        this.accounts = accounts
      } else {
        if (response.status === 500) {
          await this.$router.push("/500")
        }

        if (response.status === 403) {
          await this.$router.push("/403")
        }
      }
    },
    async newMemberSend(){
      console.log("Group show")
      await this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/base";
@import "src/assets/style/button";
@import "src/assets/style/form";
input.test{
  @apply
  rounded-l-lg
  rounded-r-none
  py-2
}
</style>
<template>
    <section >
      <h1>Profile</h1>
      <article v-if="account">
        <h2>Information personnelle</h2>
        <div class="space-y-1">
          <div class="flex w-[50%] space-x-3">
            <p>Nom: <strong>{{account.lastName}}</strong></p>
            <p>Prénom: <strong>{{account.firstName}}</strong></p>
          </div>
        </div>
        <h2>Compte</h2>
        <div class="flex w-[50%] space-x-3">
          <p>Crée le <strong>{{account.createdAt}}</strong></p>
        </div>
        <h2>Groupe</h2>
        <div>
          <p>Vous faites partie de <strong>{{countGroup}}</strong> groupe(s)</p>
        </div>
      </article>
    </section>
</template>

<script>
import BackendService from "../../service/backend.service";
import DateUtils from "../../utils/DateUtils";

export default {
  name: "AccountShow",
  data(){
    return {
      account: null,
      countGroup: 0

    }
  },
  async beforeMount() {
    const response = await BackendService.get('account/show',this.$route.params.id)
    console.log(response)
    if(response.ok){
      const { account } = response
      account.createdAt = DateUtils.convert(account.createdAt)
      this.account = account
      this.countGroup = account.Groups.length
      console.log(this.account)
    }else{
      if(response.status === 500){
        await this.$router.push("/500")
      }

      if(response.status === 403){
        await this.$router.push("/403")
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/base.scss";
@import "src/assets/style/button";
</style>
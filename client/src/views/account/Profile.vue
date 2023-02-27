<template>
    <section>
        <h1>Profile</h1>
        <article>
            <h2>Information personnelle</h2>
            <div class="space-y-1">
                <div class="flex w-[50%] space-x-3">
                  <p>Nom: <strong>{{account.lastName}}</strong></p>
                  <p>Prénom: <strong>{{account.firstName}}</strong></p>
                </div>
              <p>Email: <strong>{{account.email}}</strong></p>
            </div>
            <h2>Compte</h2>
            <div class="flex w-[50%] space-x-3">
              <p>Crée le <strong>{{account.createdAt}}</strong></p>
              <p>Modifié le <strong>{{account.updatedAt}}</strong></p>
            </div>
            <h2>Groupe</h2>
            <div>
              <p>Vous faites partie de <strong>{{countGroup}}</strong> groupe(s)</p>
            </div>
              <div class="profile-footer">

              </div>
        </article>
        <div class="button-container-between">
            <router-link to="/account/edit"><button class="button-sky">Modifier</button></router-link>
            <a><button class="button-rose" @click="onDelete">Supprimer</button></a>
        </div>

    </section>

</template>


<script>
import BackendService from "../../service/backend.service";
import DateUtils from "../../utils/DateUtils";
export default {
    data(){
      return {
        account: {
          firstName: null,
          lastName: null,
          email: null,
          createdAt: null,
          updatedAt: null,
          roleName: null
        },
        countGroup: null

      }
    },
    async beforeMount() {
      const response = await BackendService.get('account/profile','')
      console.log(response)
      if(response.ok){
        const { account, countGroup } = response
        account.createdAt = DateUtils.convert(account.createdAt)
        account.updatedAt = DateUtils.convert(account.updatedAt)
        this.account = account
        this.countGroup = countGroup
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
      async onDelete(){
        const response = await BackendService.delete('account/delete','')

        if(response.ok){
          await this.$router.push("/")
        }else{

          if(response.status === 403){
            await this.$router.push("/403")
          }
          if(response.status === 500){
            await this.$router.push("/500")
          }
        }
      }
  }
}
</script>


<style lang="scss" scoped>
@import "src/assets/style/base.scss";
@import "src/assets/style/button";
.profile-container{
    @apply
    flex-1 
    p-10 
    space-y-10
}

.profile-body{
    @apply
    flex
}
.profile-footer{
    @apply
    flex 
    flex-col 
    sm:flex-row 
    justify-between 
    p-1
}
.content-container{
    @apply
    flex 
    flex-col 
    divide-y 
    w-full
}
.content-row{
    @apply
    hover:bg-gray-200 
    text-slate-800 
    py-2
}
.tag{
    @apply
    inline-block 
    bg-sky-700 
    rounded-full 
    px-3 
    py-1 
    text-sm 
    font-semibold 
    mr-2 
    mb-2 
    text-white
    hover:bg-sky-800 
    
}

.content-row > p{
    @apply
    text-xl 
    px-2
}

.profile-footer > p {
    @apply
    text-base 
    text-gray-500
}

</style>
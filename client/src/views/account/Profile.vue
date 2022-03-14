<template>
    <section class="profile-container">
        <h5>Profile</h5>
        <article class="profile">
            <h6>Information personnelle</h6>
            <div class="profile-body">
                <div class="content-container">
                    
                    <div class="content-row">
                        <p>Nom: {{account.firstName}}</p>
                    </div>

                    <div class="content-row">
                        <p>Prénom: {{account.lastName}}</p>
                    </div>

                    <div class="content-row">
                        <p>Email: {{account.email}}</p>
                    </div>

                    <div class="content-row">
                        <p>Rôle: <span class="tag">{{account.roleName}}</span></p>
                    </div>
                </div>
            </div>
            <div class="profile-footer">
                <p>Crée le {{account.createdAt}}</p>
                <p>Modifié le {{account.updatedAt}}</p>
            </div>
        </article>
        <div class="button-container">
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
        }
      }
    },
    async beforeMount() {
      const response = await BackendService.get('account/profile','')
      console.log(response)
      if(response.ok){
        const { account } = response
        account.createdAt = DateUtils.convert(account.createdAt)
        account.updatedAt = DateUtils.convert(account.updatedAt)
        this.account = account
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
h5 {
    @apply
    font-bold 
    text-5xl 
    text-slate-800
}
h6{
    @apply
    font-bold 
    text-3xl 
    text-slate-50 
    bg-slate-800 
    rounded-tr-lg 
    rounded-tl-lg 
    p-1
}


article{
    @apply
    bg-slate-50 
    shadow 
    rounded 
    min-w-full 
    transition 
    duration-200 
    hover:shadow-lg
}
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

.button-container{
    @apply
    flex 
    flex-col 
    md:flex-row 
    md:justify-between
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

.button-rose{
    @apply
    bg-rose-600 
    text-white 
    p-2 
    shadow 
    rounded-lg 
    border 
    hover:bg-rose-500
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
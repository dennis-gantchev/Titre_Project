<template>
  <section>
    <h5>Modification compte</h5>
    <div class="form-container">
      <form @submit.prevent="onSubmit" action="POST">
        <div class="form-group">
          <div class="input-group">
            <label>Nom</label>
            <input
                type="text"
                name="lastName"
                v-model="account.lastName"
                v-bind:class="errors.lastName.length && account.lastName === lastAccount.lastName ? 'errors-input' : 'input'"
            />
            <div v-if="errors.lastName.length" class="errors-container">
                <span v-for="error in errors.lastName" v-bind:key="error">
                    <small >- {{error}}</small>
                </span>
            </div>
          </div>
          <div class="input-group">
            <label>Prénom</label>
            <input
                type="text"
                name="firstName"
                v-model="account.firstName"
                v-bind:class="errors.firstName.length && account.firstName === lastAccount.firstName ? 'errors-input' : 'input'"
            />
            <div v-if="errors.firstName.length" class="errors-container">
                <span v-for="error in errors.firstName" v-bind:key="error">
                    <small >- {{error}}</small>
                </span>
            </div>
          </div>
        </div>
        <div class="input-group">
          <label>Email</label>
          <input
              type="email"
              name="email"
              v-model="account.email"
              v-bind:class="errors.email.length && account.email === lastAccount.email ? 'errors-input' : 'input'"
          />
          <div v-if="errors.email.length" class="errors-container">
              <span v-for="error in errors.email" v-bind:key="error">
                  <small >- {{error}}</small>
              </span>
          </div>
        </div>
        <div class="button-container">
          <button class="button-sky">Envoyer</button>
        </div>
      </form>
    </div>
  </section>
</template>



<script>
import AccountService from "../../service/account.service";
import BackendService from "../../service/backend.service";

export default {
  data(){
    return{
      account: {
        lastName:"",
        firstName:"",
        email: "",
      },
      lastAccount: {
        lastName:"",
        firstName:"",
        email: "",
      },
      errors: {
        lastName: [],
        firstName:[],
        email: [],
      },
      response: null
    }
  },
  async beforeMount(){
    const response = await BackendService.get('account/edit','')
    console.log(response)
    if(response.ok){
      const { account } = response
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
    async onSubmit() {


      const errors = AccountService.editValidate(this.account)

      if (errors) {
        this.errors = errors
        this.lastAccount = JSON.parse(JSON.stringify(this.account))
      } else {
        this.response = await BackendService.put('account/update', this.account)
        if(this.response.ok){
          await this.$router.push("/account/profile")
        }else{
          if(this.response.status === 500){
            await this.$router.push("/500")
          }

          if(this.response.status === 403){
            await this.$router.push("/403")
          }
        }
      }
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
</style>
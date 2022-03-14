<template>
    <main>
        <section class="section-left">
            <div >
                <svg xmlns="http://www.w3.org/2000/svg" class="m-auto" width="200" height="200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <h5 class="title-left">Service client</h5>
            </div>
        </section>
        <section class="section-right ">
            <div class="signin-container">
                <h5 class="title-right">Inscription</h5>
                <div class="signin">
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
                        <div class="form-group">
                            <div class="input-group">
                                <label>Mot de passe</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    v-model="account.password" 
                                    v-bind:class="errors.password.length && account.password === lastAccount.password ? 'errors-input' : 'input'"     
                                />
                                <div v-if="errors.password.length" class="errors-container">
                                    <span v-for="error in errors.password" v-bind:key="error">
                                        <small >- {{error}}</small>
                                    </span>
                                </div>
                            </div>
                            <div class="input-group">
                                <label>Mot de passe confirmation</label>
                                <input 
                                    type="password" 
                                    name="passwordConfirm" 
                                    v-model="account.passwordConfirm"
                                    v-bind:class="errors.passwordConfirm.length && account.passwordConfirm === lastAccount.passwordConfirm ? 'errors-input' : 'input'"
                                />
                                <div v-if="errors.passwordConfirm.length" class="errors-container">
                                    <span v-for="error in errors.passwordConfirm" v-bind:key="error">
                                        <small >- {{error}}</small>
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div v-show="response === false" class="errors-container">
                          <small >- Email déjà utilisé.</small>
                        </div>
                        <div class="button-container">
                            <button class="button-emerald" type="submit">Inscription</button>
                        </div>
                    </form>
                </div>
                <div>
                    <router-link to="/"><button class="button-sky">Connexion</button></router-link>
                </div>
                
            </div>
            
        </section>
    </main>   
</template>

<script>
import AccountService from '../../service/account.service'
import BackendService from '../../service/backend.service'

export default {
    data(){
        return{
            account: {
                lastName:"",
                firstName:"",
                email: "",
                password: "",
                passwordConfirm:""
            },
            lastAccount: {
                lastName:"",
                firstName:"",
                email: "",
                password: "",
                passwordConfirm:""
            },
            errors: {
                lastName: [],
                firstName:[],
                email: [],
                password: [],
                passwordConfirm:[]
            },
            response: null


            
        }
    },
  methods: {
        async onSubmit() {


          const errors = AccountService.validate(this.account)

          if (errors) {
            this.errors = errors
            this.lastAccount = JSON.parse(JSON.stringify(this.account))
          } else {
            this.response = await BackendService.post('account/create', this.account)
            if(this.response.ok){
              await this.$router.push("/")
            }else{
              if(this.response.status === 500){
                await this.$router.push("/500")
              }
            }
          }
        }
    }
}
</script>

<style lang="scss" scoped>
    main {
        @apply
        flex 
        flex-col
        md:flex-row 
        min-h-screen
        w-full
        bg-blue-50
    }
     form{
        @apply 
        w-full 
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

    svg{
        @apply
        logo
        ;
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
    .main {
        @apply 
        relative
        flex 
        flex-col 
        md:flex-row 
        min-h-screen 
        w-full;
    }
    .section-left{
        @apply 
        bg-slate-800
        flex-auto
        flex
          p-1
        md:w-1/2 
        justify-center 
        items-center;
    }
    .section-right{
        @apply
        flex-auto
        flex
          p-1
        justify-center 
        items-center
        md:w-1/2 
        bg-blue-50;
    }
    .title-left{
        @apply 
        text-5xl 
        font-extrabold 
        text-slate-300
    }
    .title-right{
        @apply 
        font-bold 
        text-slate-800 
        text-3xl 
        text-center
    }
    .logo {
        @apply  text-slate-300 block
    }
    .signin-container {
        @apply 
        flex 
        flex-col 
        space-y-2 
        w-3/4
    }
    .signin{
        @apply 
        flex 
        bg-slate-50 
        shadow 
        rounded-lg 
        p-2 
        shadow 
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
    .button-emerald{
        @apply
        bg-emerald-600 
        text-white 
        p-2 
        shadow 
        rounded-lg 
        border 
        hover:bg-emerald-500
    }
</style>
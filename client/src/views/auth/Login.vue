<template>
    <main>
        <section class="section-left">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="m-auto" width="200" height="200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <h5 class="title-left">Service client</h5>
            </div>
        </section>
        <section class="section-right">
            <div class="login-container">
                <h5 class="title-right">Connexion</h5>
                <div class="login">
                    <form @submit="onSubmit" method="POST">
                        <div class="input-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                v-model="credential.email"
                                v-bind:class="errors.email.length && credential.email === lastCredential.email ? 'errors-input' : 'input'"
                            />
                            <div v-if="errors.email.length" class="errors-container">
                                <span v-for="error in errors.email" v-bind:key="error">
                                    <small>- {{error}}</small>
                                </span>
                            </div>     
                        </div>
                        <div class="input-group">
                            <label>Mot de passe</label>
                            <input 
                                type="password" 
                                name="password" 
                                v-model="credential.password"
                                v-bind:class="errors.password.length && credential.password === lastCredential.password ? 'errors-input': 'input' "
                            />
                            <div v-if="errors.password.length" class="errors-container">
                                <span v-for="error in errors.password" v-bind:key="error">
                                    <small>- {{error}}</small>
                                </span>
                            </div> 
                        </div>
                      <div v-if="response === false" class="errors-container">
                        <small>- Les identifiants n'existes pas</small>
                      </div>
                      <div class="button-container">
                            <button class="button-sky" type="submit">Connexion</button>
                        </div>
                    </form>
                </div>
                <div>
                    <router-link to="/signin"><button class="button-emerald">Inscription</button></router-link>
                </div>
                
            </div>
        </section>
    </main>
</template>

<script>
import AuthService from './../../service/auth.service'
import BackendService from "../../service/backend.service";

import Auth from "../../utils/Auth";
export default {
    data(){
        return{
            credential:{
                email: "",
                password: "",
            },
            lastCredential:{
                email: "",
                password: ""
            },
            errors: {
                email: [],
                password:[]
            },
            response: null
        }
    },
    methods:{
        async onSubmit(e){
            e.preventDefault()

            const errors = AuthService.validate(this.credential)

            if(errors){
              this.errors = errors
              this.lastCredential = JSON.parse(JSON.stringify(this.credential))
            }else{
              this.response = await BackendService.post('auth/login', this.credential)
              console.log(this.response)
              if(this.response.ok){
                const auth = new Auth()
                auth.setToken(this.response.token)
                await this.$router.push("/account/profile")
              }else{
                if(this.response.status === 500){
                  await this.$router.push("/500")
                }
                
                if(this.response.status === 400){
                    this.response = false
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
    .section-left{
        @apply 
        bg-slate-800 
        flex
          flex-auto
        md:w-1/2 
        justify-center 
        items-center;
    }
    .section-right{
        @apply 
        flex
          flex-auto
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
        @apply  text-slate-300
    }
    .login-container {
        @apply 
        flex 
        flex-col 
        space-y-2 
        w-3/4
    }
    .login{
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
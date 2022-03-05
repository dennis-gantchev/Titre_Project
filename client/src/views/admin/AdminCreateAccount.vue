<template>
    <section>
        <h5>Création de compte Admin</h5>
        <div class="form-container">
            <form action="">
                <div class="form-group">
                    <div class="input-group">
                        <label for="">Nom</label>
                        <input type="text" name="firstName" v-model="firstName"/>
                    </div>
                    <div class="input-group">
                        <label for="">Prénom</label>
                        <input type="text" name="lastName" v-model="lastName"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <label for="">Email</label>
                        <input type="email" name="email" v-model="email"/>
                    </div>
                    <div class="input-group">
                        <label for="">Rôle</label>
                        <select name="role" id="" v-model="role">
                            <option value="">Client</option>
                            <option value="">Prestataire</option>
                            <option value="">Administrateur</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <label for="">Mot de passe</label>
                        <input type="password" name="password" v-model="password"/>
                    </div>
                    <div class="input-group">
                        <label for="">Mot de passe confirmation</label>
                        <input type="password" name="passwordConfirm" v-model="passwordConfirm"/>
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
export default {
    data(){
        return{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: ""
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
    input{
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
        invalid:border-pink-500 
        invalid:text-pink-600 
        focus:invalid:border-pink-500 
        focus:invalid:ring-pink-500
    }
    select{
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
        invalid:border-pink-500 
        invalid:text-pink-600 
        focus:invalid:border-pink-500 
        focus:invalid:ring-pink-500 
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
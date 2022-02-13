<template>

    <section class="section-left">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="logo h-15 w-15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <h5 class="title-left">Service client</h5>
        </div>
    </section>
    <section class="section-right">
        <div class="login-container">
            <h5 class="title-right">Connexion</h5>
            <div class="login">
                <form action="">
                    <div class="input-group">
                        <label>Email</label>
                        <input type="email" name="email" /> 
                    </div>
                    <div class="input-group">
                        <label>Mot de passe</label>
                        <input type="password" name="password" /> 
                    </div>
                    <div class="button-container">
                        <button class="button-sky">Connexion</button>
                    </div>
                </form>
            </div>
            <div>
                <router-link to="/signin"><button class="button-emerald">Inscription</button></router-link>
            </div>
            
        </div>
    </section>
   
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
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
    .section-left{
        @apply 
        bg-slate-800 
        flex 
        md:w-1/2 
        justify-center 
        items-center;
    }
    .section-right{
        @apply 
        flex 
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
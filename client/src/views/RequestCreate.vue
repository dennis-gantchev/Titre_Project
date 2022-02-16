<template>
    <section>
        <h5>Nouvelle demande</h5>
        <div class="form-container">
            <form action="">
                <div class="form-group">
                    <div class="input-group">
                        <label for="">Titre</label>
                        <input type="text" name="title">
                    </div>
                    <div class="input-group">
                        <label for="">Rôle</label>
                        <select name="role" id="">
                            <option value="">Client</option>
                            <option value="">Prestataire</option>
                            <option value="">Administrateur</option>
                        </select>
                    </div>
                </div>
                <div class="input-group">
                    <label for="">Contenu</label>
                    <textarea name="content" id="" cols="30" rows="10">

                    </textarea>
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
    textarea{
        @apply
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
<template>
    <section>
        <h5>Nouvelle demande</h5>
        <div class="form-container">
            <form @submit="onSubmit" method="POST">
                <div class="form-group">
                    <div class="input-group">
                        <label for="title">Titre</label>
                        <input 
                            type="text" 
                            name="title" 
                            v-model="request.title" 
                            v-bind:class="errors.title.length && request.title === lastRequest.title ? 'errors-input': 'input'"
                        />
                        <div v-if="errors.title.length" class="errors-container">
                            <span v-for="error in errors.title" v-bind:key="error">
                                <small>- {{error}}</small>
                            </span>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="role">Rôle</label>
                        <select 
                            name="role" 
                            v-model="request.role"
                            class="input"
                        >
                            <option value="">Client</option>
                            <option value="">Prestataire</option>
                            <option value="">Administrateur</option>
                        </select>
                    </div>
                </div>
                <div class="input-group">
                    <label for="content">Contenu</label>
                    <textarea 
                        name="content" 
                        cols="30" 
                        rows="10" 
                        v-model="request.content"
                        v-bind:class="errors.content.length && request.content === lastRequest.content ? 'errors-input': 'input' "
                    >

                    </textarea>
                    <div v-if="errors.content.length" class="errors-container">
                        <span v-for="error in errors.content" v-bind:key="error">
                            <small>- {{error}}</small>
                        </span>
                    </div>
                </div>
                <div class="button-container">
                    <button class="button-sky" type="submit">Envoyer</button>
                </div>
            </form>
        </div>
    </section>    
</template>

<script>
import RequestService from './../../service/request.service'
export default {
    data(){
        return{
            request: {
                title:"",
                role: "",
                content: ""
            },
            lastRequest: {
                title:"",
                role: "",
                content: ""
            },
            errors: {
                title:[],
                role: [],
                content: []
            }
            
        }
    },
    methods: {
        onSubmit(e){
            e.preventDefault()
            this.lastRequest = JSON.parse(JSON.stringify(this.request))
            this.errors = RequestService.validate(this.request)

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
    .select{
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
    .textarea{
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
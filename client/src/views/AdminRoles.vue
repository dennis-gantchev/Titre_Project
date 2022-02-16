<template>
    <section>
        <h5>Roles</h5>
        <div class="flex">
             <router-link to="/admin/role/create">
                <button class="button-emerald">Nouveau</button>
             </router-link>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="first">Nom</th>
                    <th>Date de création</th>
                    <th>Date de modification</th>
                    <th class="last">Action</th> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Client</td>
                    <td>20 mars 2020</td>
                    <td>20 mars 2020</td>
                    <td>
                        <button>Voir</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="pagination-container">
            <div class="pagination">
                <a>
                    <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </a>
                <div class="pagination-content">
                    <a>1</a>
                    <a>2</a>
                    <a>3</a>
                </div>
                <a>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </a>
            </div>
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
    a{
       
    }
    h5{
        @apply
        text-slate-800 
        text-5xl 
        font-bold
    }
    table{
        @apply
        table-auto 
        min-w-full 
        shadow
    }
    thead > tr{
        @apply
        text-white
    }
    th{
        @apply
        bg-slate-900 
        p-1 
        
    }
    tbody > tr {
        @apply
        text-center 
        bg-gray-50 
        hover:bg-gray-100
    }
    td{
        @apply
        p-3
    }
    button{
        @apply 
        bg-sky-600 
        text-white 
        p-2 
        shadow 
        rounded-lg 
        border 
        hover:bg-sky-500
    }

    .pagination-container{
        @apply
        flex 
        justify-end
    }
    .pagination{
        @apply
        flex 
        space-x-2
    }
    .pagination-content{
        @apply
        flex 
        space-x-2 
        font-bold
    }
    .button-emerald{
        @apply
        bg-emerald-600 
        text-white 
        p-2 
        shadow 
        rounded-lg 
     
        hover:bg-emerald-500
    }

    .pagination>a{
         @apply
        block 
        bg-slate-50 
        shadow 
        p-2 
        transition 
        duration-200 
        hover:bg-sky-600 
        hover:text-white
    }
    th.first{
        @apply
        rounded-tl-lg
    }
    th.last{
        @apply
        rounded-tr-lg
    }
</style>


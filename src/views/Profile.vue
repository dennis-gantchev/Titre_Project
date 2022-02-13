<template>
    <section class="profile-container">
        <h5>Profile</h5>
        <article class="profile">
            <h6>Information personnelle</h6>
            <div class="profile-body">
                <div class="content-container">
                    
                    <div class="content-row">
                        <p>Nom: Jean</p>
                    </div>

                    <div class="content-row">
                        <p>Prénom: Paul</p>
                    </div>

                    <div class="content-row">
                        <p>Email: jean@gmail.com</p>
                    </div>

                    <div class="content-row">
                        <p>Rôle: <span class="tag">Client</span></p>
                    </div>
                </div>
            </div>
            <div class="profile-footer">
                <p>Crée le 28 mars 2020</p>
                <p>Modifiée le 28 mars 2020</p>
            </div>
        </article>
        <div class="button-container">
            <button class="button-sky">Modifier</button>
            <button class="button-rose">Supprimer</button>
        </div>

    </section>

</template>


<script>
export default {
    
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
    justify-between
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
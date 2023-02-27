<template>
  <div class="flex flex-col space-y-4">
    <div class="flex w-[40%] space-x-2">
      <div class="flex">
        <input type="search" v-model="filterValue" placeholder="Recherche" />
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" class="bi bi-search bg-blue-900 text-white px-2 rounded-r-lg" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </div>
      <div class="flex">
        <NewMemberForm :accounts="accounts" :groupId="groupId" :roles="roles" :onAddMember="onAddMember" @onClickStopAddMember="onClickStopAddMember" @memberIsSend="memberIsSend" />
        <button class="bg-blue-900 border border-l-0 text-white py-2 px-2 rounded" @click="onClickAddMember">Ajouter membre</button>
      </div>
    </div>

    <div class="flex space-x-2">
      <span v-for="(member, index) in membersCurrent[page-1]" :key="index">
        <router-link :to="'/account/show/'+ member.id">
          <div class="flex border shadow-sm rounded-lg bg-white space-x-1 basis-4/12 hover:bg-blue-200">
            <img class=" h-full rounded-l-lg shadow-sm" src="http://localhost:3003/uploads/default-placeholder.png" alt="" width="77" height="77"/>
            <div class="pr-2">
              <p class="font-medium"><span class="font-normal text-xl">{{member.firstName}} {{member.lastName}}</span></p>
              <p class="font-bold"><span class="font-normal text-blue-800">{{member.Roles[0].name}}</span></p>
            </div>
          </div>
        </router-link>
      </span>
    </div>
    <div v-if="!filterValue" class="flex space-x-3">
      <svg v-if="page !== 1" xmlns="http://www.w3.org/2000/svg" width="24" height="40" fill="currentColor" class="bi bi-arrow-left text-black bg-slate-100 shadow rounded hover:bg-blue-900 hover:text-white" viewBox="0 0 16 16" @click="changePageDecrement">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      <div :class="pageNumber  !== page ? 'bg-white shadow rounded py-2 px-3 font-medium hover:bg-blue-900 hover:text-white cursor-pointer ' : 'bg-blue-900 text-white shadow rounded py-2 px-3 font-medium cursor-pointer' " v-for="pageNumber in maxPage" @click="changePage(pageNumber)">
        {{pageNumber}}
      </div>
      <svg v-if="page !== maxPage" xmlns="http://www.w3.org/2000/svg" width="24" height="40" fill="currentColor" class="bi bi-arrow-right text-black bg-white shadow rounded hover:bg-blue-900 hover:text-white cursor-pointer" viewBox="0 0 16 16" @click="changePageIncrement">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import NewMemberForm from "../group/NewMemberForm.vue";
export default {
  name: "MemberList",
  components: {NewMemberForm},
  props: ["members", 'roles', 'accounts', 'groupId'],
  data () {
    return{
      filterValue : null,
      maxElement: 1,
      membersCurrent: [],
      page: 1,
      maxPage: Math.floor(this.members.length / 1) ,
      onAddMember: false

    }
  },
  beforeMount() {
    this.membersCurrent = this.divideElementArray(this.maxElement, JSON.parse(JSON.stringify(this.members)))
    console.log(this.maxPage)
  },
  methods: {
    changePage(page){
      this.page = page
    },
    changePageIncrement(){
      this.page += 1
    },
    changePageDecrement(){
      this.page -= 1
    },
    memberIsSend(){
      console.log("Memebr list")
      this.$emit("newMemberSend")
    },
    divideElementArray (maxElement, members){

      const result = []
      const temp = []
      let currentIndex = 0
      console.log(members)
      while(currentIndex !== this.maxPage ){
        // if(members.length < maxElement){
        //   temp.push(members.splice(currentIndex, members.length))
        // }else{
        //
        //
        // }
        temp.push(members.splice(0, maxElement))
        console.log(members)
        currentIndex += 1
      }
      console.log(temp)
      return temp
    },
    onClickAddMember(){
      this.onAddMember = true
    },
    onClickStopAddMember(){
      this.onAddMember = false
    }
  },
  watch: {
    filterValue(newFilterValue, oldFilterValue){
      console.log(this.membersCurrent)
      console.log(this.members)
      this.membersCurrent = []
      if(newFilterValue){
        for(let member of this.members){
          let isSameValue = false
          let fullname = member.firstName + " " + member.lastName
          console.log(fullname)
          if(fullname.toLowerCase().includes(newFilterValue.toLowerCase())){
            isSameValue = true
          }

          if(member.Roles[0].name.toLowerCase().includes(newFilterValue.toLowerCase())){
            console.log(member.Roles[0].name)
            isSameValue = true
          }
          console.log(member)
          if(isSameValue){
            this.membersCurrent.push(member)

            console.log("Trie")
            console.log(this.membersCurrent)
          }
        }
      }else{
        this.membersCurrent = this.members
      }

      this.membersCurrent = this.membersCurrent ? this.divideElementArray(this.maxElement, JSON.parse(JSON.stringify(this.membersCurrent))) : []


    },
    members(newListMember, oldListMember){
      this.membersCurrent = this.divideElementArray(this.maxElement, JSON.parse(JSON.stringify(this.members)))

    },
    membersCurrent(n, old){
      console.log(n)
    },
    page(np, old){
      console.log(np)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/base";
@import "src/assets/style/button";
@import "src/assets/style/form";
</style>
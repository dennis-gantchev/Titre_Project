<template>

</template>

<script>
import BackendService from "../../service/backend.service";
import Auth from "../../utils/Auth";
import DateUtils from "../../utils/DateUtils";

export default {
  name: "GroupShow",
  async beforeMount(){
    console.log(this.$route.params.id)
    const response = await BackendService.get('group/show',this.$route.params.id)
    if(response.ok){
      console.log(response)
    }else{
      if(response.status === 500){
        await this.$router.push("/500")
      }

      if(response.status === 403){
        await this.$router.push("/403")
      }
    }
  },
}
</script>

<style scoped>

</style>
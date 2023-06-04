<template>
  <div class="soon">
    <img alt="Vue logo" src="https://e-gerbo.com.br/wp-content/uploads/2019/11/EM-BREVE.png">
    <HelloWorld msg=" "/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SidebarView from '@/components/SidebarView.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    SidebarView
  }
}
</script>
<style>
.soon {
    margin-left: 15%;
    width: calc(84% - 10px);
    justify-content: center;
    position: relative;
    bottom: 0;
    display: inline-block;
    max-width: 100%;
}
</style>

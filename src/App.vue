<template>
<div>
  <SidebarView/>
  <router-view />

</div>
</template>


<script>
// import Sidebar from 'primevue/sidebar';
// import InputSwitch from 'primevue/inputswitch';
// import LoaderView from './views/LoaderView.vue';
// import Button from 'primevue/button';
import SidebarView from './components/SidebarView.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      user: "Usuário Loagado",
      fullPage: false,
      visible: true,
      isLoading: true,
      checked: false,

    }
  },
  mounted() {

  },
  setup() {

  },
  methods: {
    darkmode() {
      const $html = document.querySelector('html');
      const $switch = document.querySelector('#darkmode');

      $switch.addEventListener('change', function () {
        $html.classList.toggle('dark-mode')
      })
    }
  },
  components: {
    SidebarView
},
})


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root {
  --bg-off: white;
}

#darkmode {}

.switch-space {
  margin-left: 2vh;
}

.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
  background: #09121a;
}

.p-inputswitch.p-inputswitch-checked:not(.p-disabled):hover .p-inputswitch-slider {
  background: #c70dec;
}

.p-inputswitch .p-inputswitch-slider {
  background: #4c4e50;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 30px;
}

.p-inputswitch:not(.p-disabled):hover .p-inputswitch-slider {
  background: #4c4e50;
}

.p-inputswitch .p-inputswitch-slider:before {
  background: #80179b;
}

.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider:before {
  background: #80179b;
}

.sidenav {
  height: 100%;
  width: 15%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  padding-top: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.sidenav a {
  margin: 30px;
  padding: 6px 8px 6px 16px;
  font-size: 14px;
  color: #818181;
  display: block;
  border-radius: 5px;

  transition: background-color 0.2s ease;
  transition-delay: 0.1s;
}

.sidenav a:hover {
  color: #9d2bb4;
}


@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav a {
    font-size: 18px;
  }

}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

#user {
  margin-left: 1vw;
}

.p-sidebar-header {
  width: 0;
}

.link-sidebar {
  margin-bottom: 2vw;
  text-align: left;
  flex-wrap: nowrap;
  color: black;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}

.link-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

#icon-router {
  margin-right: 5px;
}

a:-webkit-any-link {
  color: black;
  cursor: pointer;
  text-decoration: none;
} 
</style>

<template>
  <div class="container">
    <div class="sidenav">
      <div class="link-sidebar">
        <router-link id="text-router" to="/avaliacao">
          <span class="pi pi-file-edit" id="icon-router" v-tooltip.right="'Nova Avaliação'"></span>
          <span >Nova Avaliação</span>
        </router-link>
      </div>
      <div class="link-sidebar">
        <router-link id="text-router" to="/">
          <span class="pi pi-home" id="icon-router" v-tooltip.right="'Dashboard'"></span>
          <span>Dashboard</span>
        </router-link>
      </div>
      <div class="link-sidebar">
        <router-link id="text-router" to="/">
          <span class="pi pi-bell " id="icon-router" v-tooltip.right="'Notificações'"></span>
          <span>Notificações</span>
        </router-link>
      </div>
      <div class="link-sidebar">
        <router-link id="text-router" to="/">
          <span class="pi pi-chart-pie" id="icon-router" v-tooltip.right="'Histórias de Usuario'"></span>
          <span>Histórias de Usuario</span>
        </router-link>
      </div>
      <div class="link-footer">
        <div class="link-sidebar">
          <router-link id="text-router" to="/about">
            <span class="pi pi-sign-out" id="icon-router" v-tooltip.right="'About Me'"></span>
            <span>Sair</span>
          </router-link>
        </div>
        <div class="link-sidebar" >
          <router-link id="text-router" to="/about" >
            <span class="pi pi-sun" id="icon-router" v-tooltip.right="'Modo Escuro'" ></span>
            <span>Modo Escuro
            </span>
            <InputSwitch class="switch-space" id="darkmode" v-model="checked" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>


<script>
// import Sidebar from 'primevue/sidebar';
import InputSwitch from 'primevue/inputswitch';
// import Button from 'primevue/button';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      user: "Usuário Loagado",
      visible: true,
      checked: false

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

      $switch.addEventListener('change', function(){
        $html.classList.toggle('dark-mode')
      })
    }
  },
  components: {
    // Sidebar,
    InputSwitch
    // Button
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

:root{
  --bg-off: white;
}

#darkmode{

}
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

/* The sidebar menu */
.sidenav {
  height: 100%;
  /* Full-height: remove this if you want "auto" height */
  width: 15%;
  /* Set the width of the sidebar */
  position: fixed;
  /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1;
  /* Stay on top */
  top: 0;
  /* Stay at the top */
  left: 0;
  /* background-color: #afa8a8; */
  /* Black */
  /* overflow-x: hidden; */
  /* Disable horizontal scroll */
  padding-top: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* The navigation menu links */
.sidenav a {
  margin: 30px;
  padding: 6px 8px 6px 16px;
  /* text-decoration: none; */
  font-size: 14px;
  color: #818181;
  display: block;
  border-radius: 5px;

  transition: background-color 0.2s ease;
  transition-delay: 0.1s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  background-color: #9d2bb4;
}


/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
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
}</style>

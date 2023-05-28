<template>
  <div>
    <div class="sidenav">
      <div class="link-sidebar">
        <div class="hello-login" v-if="isLogged">
          <row>Olá, </row><br/>
          <span class="hello-name">{{ nome }}</span>

        </div>
        <router-link id="text-router" to="/avaliacao">
          <span class="pi pi-file-edit" id="icon-router" v-tooltip.right="'Nova Avaliação'"></span>
          <span>Nova Avaliação</span>
        </router-link>
      </div>
      <div class="link-sidebar">
        <router-link id="text-router" to="/DashboardView">
          <span class="pi pi-home" id="icon-router" v-tooltip.right="'Dashboard'"></span>
          <span>Dashboard</span>
        </router-link>
      </div>
      <!-- <div class="link-sidebar">
        <router-link id="text-router" to="/">
          <span class="pi pi-bell " id="icon-router" v-tooltip.right="'Notificações'"></span>
          <span>Notificações</span>
        </router-link>
      </div> -->
      <div class="link-sidebar">
        <router-link id="text-router" to="/">
          <span class="pi pi-chart-pie" id="icon-router" v-tooltip.right="'Histórias de Usuario'"></span>
          <span>Histórias de Usuario</span>
        </router-link>
      </div>
      <div class="link-footer">
        <div class="link-sidebar">
          <router-link id="text-router" to="/Account" v-if="isLogged">
            <span class="pi pi-sign-out" id="icon-router" @click="verifyLogin()"
              v-tooltip.right="'Deslogar da conta'"></span>
            <span>Sair</span>
          </router-link>
          <router-link id="text-router" to="/Account" v-else>
            <span class="pi pi-sign-in" id="icon-router" @click="verifyLogin()" v-tooltip.right="'Logar'"></span>
            <span>Entrar</span>
          </router-link>

        </div>
        <div class="link-sidebar">
          <!-- <router-link id="text-router" to="/about">
            <span class="pi pi-sun" id="icon-router" v-tooltip.right="'Modo Escuro'"></span>
            <span>Modo Escuro
            </span>
            <InputSwitch class="switch-space" id="darkmode" v-model="checked" /> 
          </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: 'SidebarView',
  setup() {
    const isLogged = ref(true);
    const token = ref();
    const username = ref();
    const nome = ref('');
    const expiration = ref();

    onMounted(() => {
      getUserData();
    });

    function getUserData() {
      // Recuperando os dados do LocalStorage
      token.value = localStorage.getItem('token');
      username.value = localStorage.getItem('username');
      nome.value = localStorage.getItem('nome');
      expiration.value = localStorage.getItem('expiration');
      console.log(nome);
      // Se algum valor não for encontrado, é melhor devolver um objeto vazio ou nulo
      if (!token.value || !username.value || !expiration.value) {
        isLogged.value = false;
        return null;
      }

      // Transformando a data de expiração de volta em um objeto Date
      const expirationDate = new Date(Number(expiration) * 1000);

      // Devolvendo um objeto contendo os dados do usuário
      return {
        token,
        username,
        nome,
        expiration: expirationDate
      };
    }
    return {
      isLogged,
      token,
      username,
      nome,
    };
  }
};

</script>


<style>

.hello-login{
  margin-left: 15px; 
}
.hello-name{
  margin-left: 10px;
  font-style: italic;
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
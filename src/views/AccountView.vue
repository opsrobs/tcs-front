<template>
    <div style="background-color: aqua;">
        <SidebarView />
        <Toast />
        <body>
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form @submit.prevent="formIsLogin()">
                <h3 v-if="isVisible">{{ checkTittle() }}</h3>

                <label class="signup" v-if="!isVisible">Nome</label>
                <input class="signup" v-if="!isVisible" type="text" v-model="usuario.nome" required placeholder="Nome"
                    id="nome">


                <label for="username">Email</label>
                <input type="text" v-model="usuario.email" required placeholder="Email" id="username">

                <label for="password">Senha</label>
                <input type="password" v-model="usuario.senha" required placeholder="Senha" id="password">
                <label v-if="!isVisible" for="password">Confirme a senha</label>
                <input v-if="!isVisible" type="password" v-model="new_pass" required placeholder="Senha" id="password">
                <span class="review-password" v-if="!isValid">As senhas não conferem</span>

                <button v-show="isVisible" class="login-submit">Login</button>

                <span v-if="isVisible" class="create-account">Não possui conta?</span>


                <br /><a v-if="isVisible" class="link-create-account" @click="createAccount()" href="#">Crie sua conta!</a>

                <a href="#" class="link-create-account" style="color: rgb(0, 68, 255);" v-if="!isVisible">Termos e
                    condições</a>
                <button @click="formIsRegister()" v-if="!isVisible" class="create-account-button">Registrar</button>

                <span v-if="!isVisible" class="create-account">Já possui conta?</span>
                <br /><a v-if="!isVisible" class="link-create-account" @click="createAccount()" href="#">Acesse sua
                    conta!</a><br />

            </form>
        </body>



    </div>
</template>
<script>
// import firebaseConfig from '../../firebaseConfig';
// import userChart from './../states/chartstate'
import SidebarView from '@/components/SidebarView.vue';
import Toast from 'primevue/toast';

import axios from 'axios';
export default {
    data() {
        return {
            new_pass: '',
            isValid: true,
            isNewUser: false,
            isLogin: false,
            usuario: {
                email: '',
                nome: '',
                senha: ''
            },
            showSidebar: false,
            isVisible: true,
            //=====================

        }
    }, methods: {
        setUserData(token, username) {
            // Primeiro, vamos decodificar o token para extrair o payload.
            // JWTs são de formato 'header.payload.signature'. Queremos o payload.
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            // Agora que temos o payload, podemos extrair o nome do usuário e a data de expiração.
            const expiration = payload.exp;

            // Finalmente, vamos armazenar essas informações no LocalStorage.

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('expiration', expiration);
            // localStorage.setItem('nome', this.usuario.nome);
        },
        createAccount() {
            this.isValid = true;
            this.usuario.email = '',
                this.usuario.nome = '',
                this.usuario.senha = ''

            this.isLogin = !this.isLogin

            return this.isVisible == true
                ? this.isVisible = false
                : this.isVisible = true
        },
        toastMessage(item, msg) {
            return item != 200
                ? this.$toast.add({ severity: 'error', detail: msg, life: 3000 })
                : this.$toast.add({ severity: 'success', detail: ' Solicitação realizada com sucesso!!!', life: 3000 })

        },
        getUsernameFromEmail(email) {
            const parts = email.split('@');
            if (parts.length > 0) {
                return parts[0];
            } else {
                return null;
            }
        },
        emailIsValid(email) {
            const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

            if (emailRegex.test(email)) {
                console.log("O email é válido.");
                return true
            } else {
                console.log("O email é inválido.");
                this.toastMessage(0, "Verifique o email informado!")
                return false
            }
        },
        formIsRegister() {
            if (this.emailIsValid(this.usuario.email)) {
                if (this.usuario.senha === this.new_pass && this.new_pass != '') {
                    console.log("success")
                    this.isNewUser = true
                    this.isLogin = false
                    this.sendRequestSignUp()
                    console.log(this.isVisible)
                } else if (this.usuario.senha != this.new_pass) {
                    this.isNewUser = true
                    this.isLogin = false
                    this.isValid = false
                }

            }
        },
        formIsLogin() {
            if (!this.isNewUser && !this.isLogin) {
                console.log("successss")
                console.log(this.isVisible)
                this.sendRequestLogin()
            } else {
                console.log("")
                // this.sendRequestLogin()
            }
        },
        async sendRequestSignUp() {
            this.isLoading = true
            const formData = new FormData();
            formData.append('nome', this.usuario.nome);
            formData.append('email', this.usuario.email);
            formData.append('senha', this.usuario.senha);


            try {
                const response = await axios({
                    url: 'http://127.0.0.1:5000/register',
                    method: 'POST',
                    data: formData
                });
                console.log(response.status);
            } catch (error) {
                console.log(error);
                this.toastMessage(error.code);
            } finally {
                this.isLoading = false;
            }
        },

        async sendRequestLogin() {
            this.isLoading = true;
            const username = this.usuario.email;
            const password = this.usuario.senha;

            // Codificar credenciais em base64
            const token = btoa(username + ":" + password);

            try {
                const response = await axios({
                    url: 'http://127.0.0.1:5000/auth',
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + token
                    }
                });

                this.setUserData(response.data.token, response.data.nome);
                this.showSidebar = true;
                this.$router.push('/DashboardView');
            } catch (error) {
                this.toastMessage(error.code,"Usuario ou senha invalidos. Verifique as credenciais!!!");
            } finally {
                this.isLoading = false;
            }
        },

        checkTittle() {
            return this.isVisible ? 'Acesse a Plataforma' : 'Criar nova conta'
        }
    },
    components: {
        SidebarView,
        Toast
    }
}
</script>
<style media="screen">
*,
*:before,
*:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body {
    background-color: #fefefe;
}

.create-account-button,
.login-submit,
input[type="button"],
input[type="submit"] {
    position: relative;
    display: block;
    margin-top: 12px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(255, 255, 255, 0.47);
    font-weight: bold;
    font-family: sans-serif;
    border-radius: 25px;
    width: 45%;
    z-index: 1;

    width: 90px;
    height: 40px;
    overflow: hidden;
    transition: background-color 0.3s ease;
}

.create-account-button:before,
.login-submit:before,
input[type="button"]:before,
input[type="submit"]:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -2px;
    /* this creates the border effect */
    border-radius: inherit;
    background: linear-gradient(90deg, rgb(247, 67, 157), rgb(134, 62, 175));
    opacity: 0;
    transition: opacity 0.3s ease;
}

.create-account-button:hover:before,
.login-submit:hover:before,
input[type="button"]:hover:before,
input[type="submit"]:hover:before {
    opacity: 1;
}



*/ .background {
    width: 430px;
    height: auto;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
}

.background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}


form {
    margin-left: 10%;
    height: auto;
    width: 400px;
    background-color: #e7e2eb;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid #eb9ed0;
    box-shadow: 0 0 40px #cd98b4;
    padding: 50px 35px;
}

form * {
    font-family: 'Poppins', sans-serif;
    color: #462f46;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}

form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

label {
    display: block;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
}

input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.47);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;

    transition: box-shadow 0.3s ease;
}

input:focus {
    outline: none;
    box-shadow: 5px 5px 0px 0px rgb(210, 136, 205);
}

/* .signup{
    display: flex;
    width: 40%;
    height: 35px;
} */
::placeholder {
    color: #ce8e4f53;
}

.social {
    margin-top: 30px;
    display: flex;
}

.social div {
    background: red;
    width: 150px;
    border-radius: 3px;
    padding: 5px 10px 10px 5px;
    background-color: rgba(255, 255, 255, 0.47);
    color: #d4a373;
    text-align: center;
}



.review-password {
    display: flex;
    padding-top: 0.5rem;
    padding-left: 0.5rem;

    font-size: 10px;
    font-style: normal;
    color: #ea1538;

    animation: view .3s;

}

.create-account {
    font-size: 10px;
}

.link-create-account {
    font-size: 12px;
}

@media screen and (max-height: 750px) {
    form {
        height: 530px;
        width: 300px;
        top: 50%;
        left: 50%;
        padding: 20px 30px;
    }
}
</style>
<template>
    <div>

        <body>
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form @submit.prevent="login()">
                <h3 v-if="isVisible">{{ checkTittle() }}</h3>

                <label class="signup" v-if="!isVisible">Nome</label>
                <input class="signup" v-if="!isVisible" type="text" v-model="user.nome" required placeholder="Nome"
                    id="nome">

                <label v-if="!isVisible">CPF</label>
                <input v-if="!isVisible" type="text" name="ao_cpf" maxlength="11" v-model="user.cpf_cnpj" required
                    placeholder="000.000.000-00" id="cpf">

                <label v-if="!isVisible">Data de nascimento</label>
                <input v-if="!isVisible" type="text" v-model="user.data_nasc" required placeholder="dd/mm/aaaa"
                    id="data_nasc">


                <label for="username">Username</label>
                <input type="text" v-model="user.userName" required placeholder="Email or User" id="username">

                <label for="password">Password</label>
                <input type="password" v-model="user.password" required placeholder="Password" id="password">
                <label v-if="!isVisible" for="password">Confirm password</label>
                <input v-if="!isVisible" type="password" v-model="new_pass" required placeholder="Confirm password"
                    id="password">
                <span class="review-password" v-if="!isValid">As senhas não conferem</span>

                <input v-show="isVisible" class="login-submit" type="submit" value="Login">
                <span class="create-account">Not a User?</span>
                <br /><a class="link-create-account" @click="createAccount()" href="#">Create Account!</a>

                <input @click="new_user()" v-if="!isVisible" class="create-account" type="submit" value="Create">
                <div class="social">
                    <div v-show="isVisible" @click="handleLogingGoogle" class="go"><i class="fab fa-google"></i> Google
                    </div>
                    <div v-show="isVisible" @click="handleLogingGitHub" class="fb"><i class="fab fa-github"></i> Github
                    </div>
                    <div v-show="isVisible" @click="handleLogingTwitter" class="fb"><i class="fab fa-twitter"></i>
                        Twitter</div>
                </div>
            </form>
        </body>



    </div>
</template>
<script>
// import firebaseConfig from '../../firebaseConfig';
// import userChart from './../states/chartstate'
import axios from 'axios';
// import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, GithubAuthProvider } from "firebase/auth";

// firebaseConfig

// const provider = new GoogleAuthProvider();
// const providerTwitter = new TwitterAuthProvider();
// const providerGithub = new GithubAuthProvider();
// const auth = getAuth();

export default {
    data() {
        return {
            new_pass: '',
            isValid: true,
            user: {
                nome: '',
                cpf_cnpj: '',
                data_nasc: '',
                userName: '',
                password: '',
                roles: [
                    {
                        roleId: 1,
                        roleName: "ROLE_USER"
                    }
                ]
            },
            isVisible: true,
            //=====================

        }
    }, methods: {

        // handleLogingGoogle() {
        //     signInWithPopup(auth, provider)
        //         .then((result) => {
        //             //const user = result.user;

        //             console.log(result._tokenResponse)

        //             this.user.nome = result._tokenResponse.displayName
        //             // this.user.last_name = result._tokenResponse.lastName
        //             this.user.userName = result._tokenResponse.email
        //             // verificar se há ou não username. 
        //             // Caso não haja, criar método para validar qual campo deve ser apresentado

        //             //this.user = result.user.displayName;
        //             this.isVisible = false
        //         }).catch((error) => {
        //             console.log(error)
        //         });
        // },
        validadePassword() {
            if (this.user.password === this.new_pass && this.new_pass.length === 0) {
                return this.isValid
            } else if (this.user.password != this.new_pass) {
                return this.isValid = false
            } else
                return this.isValid = true
        },
        // async login() {
        //     console.log(this.user.userName + '  ' + this.user.password)
        //     axios.get('http://localhost:8080/e-commerce/',
        //         {
        //             auth: {
        //                 username: this.user.userName,
        //                 password: this.user.password
        //             },
        //         })
        //         .then(resp => {
        //             console.log(resp.data)
        //             userChart.contentPerson.pessoa.userName = this.user.userName
        //             userChart.contentPerson.pessoa.userID= resp.data.userID
        //             userChart.pwd = this.user.password
        //             this.mountUser(this.user.userName)
        //             console.log(userChart.pwd)
        //             this.$router.push('/bolo')

        //             // console.log(this.user.userName)
        //         }).catch((error => console.log(error)))
        //         console.log('<>')
        // },
        // mountUser(userName) {
        //     console.log(userChart.contentPerson.pessoa.userName)
        //      axios.get(`http://localhost:8080/e-commerce/user/${userName}`,
        //         {
        //             auth: {
        //                 username: userChart.contentPerson.pessoa.userName,
        //                 password: userChart.pwd
        //             },
        //         })
        //         .then(resp => {
        //             userChart.contentPerson.pessoa = resp.data
        //             console.log(userChart.contentPerson.pessoa)
        //         }).catch(resp => console.log(resp))
        // },
        createAccount() {
            this.isVisible = false
        },
        new_user() {
            console.log(this.user)
            if (this.isValid) {
                axios.post('http://localhost:8080/e-commerce/new-user',
                    this.user)
                    .then(resp => {
                        this.$router.push('/login')
                        console.log(resp.data)
                    }).catch(resp => alert(resp.body))
            }
        },
        // handleSignOut() {
        //     const auth = getAuth();
        //     signOut(auth).then(() => {
        //         this.user = ''
        //         this.isSignedIn = false
        //     }).catch((error) => {
        //         console.log(error)
        //     });

        // },
        // handleLogingTwitter() {
        //     signInWithPopup(auth, providerTwitter)
        //         .then((result) => {
        //             //const user = result.user;

        //             this.user.first_name = result._tokenResponse.fullName
        //             // this.user.last_name = result._tokenResponse.lastName
        //             this.user.username = result._tokenResponse.screenName
        //             console.log(result)
        //             console.log(result._tokenResponse)
        //             this.user.nome = result.user.displayName;
        //             this.isVisible = false
        //         }).catch((error) => {
        //             console.log(error)
        //         });
        // },
        // handleLogingGitHub() {
        //     signInWithPopup(auth, providerGithub)
        //         .then((result) => {
        //             //const user = result.user;
        //             console.log(result)
        //             console.log(result._tokenResponse)

        //             this.user = result.user.displayName;
        //             this.isVisible = false
        //         }).catch((error) => {
        //             console.log(error)
        //         });
        // },
        checkTittle() {
            return this.isVisible ? 'Login Here' : 'Create account'
        }
    },
    components: {
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


.login-submit,
input[type="button"],
input[type="submit"] {
    display: block;
    margin-top: 12px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(255, 255, 255, 0.47);
    font-weight: bold;
    font-family: sans-serif;
    border-radius: 25px;
    width: 45%
}





/* .shape:first-child {
    background: linear-gradient(#d4a373,
            #d4a373);
    left: -30px;
    top: 500px;
} */

/* .shape:last-child {
    background: linear-gradient(to right,
            #d4a373,
            #d4a373);
    right: -30px;
    bottom: -80px;
} */

form {
    height: auto;
    width: 400px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 55%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid #e9edc9;
    box-shadow: 0 0 40px #d4a373;
    padding: 50px 35px;
}

form * {
    font-family: 'Poppins', sans-serif;
    color: #d4a373;
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

.social div:hover {
    background-color: rgba(255, 255, 255, 0.47);
    border-radius: 10%
}

.social .fb {
    margin-left: 25px;
}

.social i {
    margin-right: 4px;
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

@keyframes view {
    0% {
        margin-left: 0;
    }

    25% {
        margin-left: 7px;
    }

    50% {
        margin-left: 0;
    }

    75% {
        margin-left: -7px;
    }

    100% {
        margin-left: 0;
    }
}
</style>
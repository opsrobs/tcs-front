<template>
    <div style="background-color: #F2EFFA;">
        <SidebarView />
        <Toast />
        <div class="text-dash">
            <div class="cards-area">
                <div class="c-loader " :style="{ display: isLoading ? 'block' : 'none' }">
                </div>
                <div id="chart-user">
                    <div class="title-area">
                        <span style="margin: 20px;">Adicione sua História de Usuário abaixo:</span>
                    </div>
                    <div>
                        <Textarea v-on:keyup.enter="submitRequest" v-model="prototipoGpt.input_us" class="user-text" 
                            autoResize rows="18" cols="100" />
                    </div>
                </div>
                <div class="top-divs">
                    <span>
                        <div class="one">
                            <div class="title-area">
                                <span style="margin: 20px;">Resultado Padronizado:</span>
                            </div>

                            <div class="input-request-us">
                                <div style="text-align: justify;" class="user-text-div">
                                    <div class="content-return">
                                        {{ prototipoGpt.pattern_suggestion }}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="two">
                            <div class="title-area">
                                <span style="margin: 20px;">Resultado Requirements Smells:</span>
                            </div>
                            <div class="output-request-us">
                                <div style="text-align: justify;" class="user-text-div">
                                    <div class="content-return">
                                        {{ prototipoGpt.smells_id }}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        <div class="pos-button">
            <my-button style="background-color: #9d2bb4 ;" label="Submit" @click="sendRequest(prototipoGpt.input_us)"
                :disabled="!isTextareaValid" />

        </div>

        <LoaderView v-show="isLoading" />
    </div>
</template>
  
<script>
import Textarea from 'primevue/textarea';
import LoaderView from '../components/LoaderView.vue';
import SidebarView from '../components/SidebarView.vue';
import Toast from 'primevue/toast';

const axios = require('axios');

// import Button from 'primevue/button';
export default {
    data() {
        return {
            tips: [
                {
                    text: "Digite sua user story na caixa de texto indicada.",
                },
                {
                    text: "Clique no botão \"Corrigir\".",
                },
                {
                    text: "Se houver algum erro, ele será destacado em vermelho na caixa de texto e uma mensagem de erro será exibida.",

                },
                {
                    text: "Corrija o erro indicado e clique novamente no botão \"Corrigir\".",

                },
                {

                    text: "Repita o processo até que não haja mais erros.",
                }

            ],
            isLoading: false,
            fullPage: false,
            loader: 'bars',
            modelAdd: false,
            modelUpdate: false,
            prototipoGpt: {
                input_us: '',
                pattern_suggestion: null,
                smells_id: null
            },
            responseTime: null,
            token: '',
            username: '',
            nome: '',
            expiration: null,
            textLength: false,
        }
    },
    computed: {
        isTextareaValid() {
            return this.prototipoGpt.input_us.length > 20;
        },
    },
    methods: {
        submitRequest: function() {
            // Envie sua requisição aqui
            if(this.isTextareaValid){
                console.log('Enter foi pressionado!');
            }
        },
        formatTime(milliseconds) {
            const seconds = Math.floor(milliseconds / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);

            if (hours > 0) {
                return `${hours} hour(s)`;
            } else if (minutes > 0) {
                return `${minutes} minute(s)`;
            } else {
                return `${seconds} second(s)`;
            }
        },
        validateEndRequest(text){
            if(text.endsWith(".")){
                return text
            }else
                return text + "."
        },

        async sendRequest(prototipo) {
            this.getUserData()
            this.isLoading = true
            const formData = new FormData();
            formData.append('prompt', this.validateEndRequest(prototipo));
            console.log(Array.from(formData.entries()));
            const start = Date.now();
            let end = Date.now();
            console.log(this.validateEndRequest(prototipo));

            await axios({
                url: `http://127.0.0.1:5000/historias?token=${this.token}`,
                method: 'POST',
                data: formData
            })
                .then(response => {
                    console.log(response.data),
                        this.prototipoGpt.pattern_suggestion = response.data.historia.trimStart(),
                        console.log(this.prototipoGpt.pattern_suggestion)
                    this.prototipoGpt.smells_id = this.removeSpaces(response.data.smell).trimStart(),
                        this.isLoading = false
                    this.toastMessage(response.status)
                    end = Date.now();
                    this.responseTime = end - start;
                })
                .catch(error => {
                    console.error(error);
                    this.toastMessage(error.code),
                        this.isLoading = false,
                        end = Date.now();

                });
            console.log(this.formatTime(this.responseTime));

        },
        toastMessage(item) {
            return item != 200
                ? this.$toast.add({ severity: 'error', detail: ' Não foi possivel estabelecer conexão com o servidor', life: 3000 })
                : this.$toast.add({ severity: 'success', detail: ' Solicitação realizada com sucesso!!!', life: 3000 })

        },
        removeSpaces(text) {
            let startIndex = text.indexOf('\n\n') + 2
            return text.slice(startIndex)
        },
        checkTextLength() {
            return this.prototipoGpt.input_us.value.length >= 35
                ? this.textLength = true
                : this.textLength = false
        },
        clear() {
            this.prototipoGpt.input_us = ""
            this.prototipoGpt.pattern_suggestion = null
        },
        extrair(prototipo) {
            const regex = /<div class="result">(.*?)<\/div>/s;
            const resultado = regex.exec(prototipo);

            if (resultado === null) {
                return '';
            } else {
                return resultado[1].trimStart()
            }

        },
        getResponse(prototipo) {
            const formData = new FormData();
            formData.append('detalhe', prototipo);
            //   formData.append('campo2', 'valor2');
            console.log(Array.from(formData.entries()))
            console.log(prototipo)
            axios({
                url: 'http://127.0.0.1:5000/getsmell',
                method: 'GET',
                data: formData

            })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getUserData() {
            this.token = localStorage.getItem('token');
            this.username = localStorage.getItem('username');
            this.nome = localStorage.getItem('nome');
            this.expiration = localStorage.getItem('expiration');
        },

    },

    components: {
        Textarea,
        LoaderView,
        SidebarView,
        Toast
    }
}

</script>
<style>
.content-return {
    margin: 4px;
    color: #383238
}

.cards-area {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    top: 5vh;
    /* grid-auto-rows: 200px; */
}

.one {
    top: 0;
    position: absolute;

}

.two {
    bottom: 0;
    position: absolute;

}

.pos-button {
    margin-left: 16%;
    display: flex;
    justify-content: center;
    margin-right: 10rem;
    margin-top: 35px;
}

.top-divs {
    justify-content: space-between;
    /* align-items: center;
    margin-top: -5px;
    border-radius: 1%;
    height: 100%;

    display: flex;
    grid-template-rows: auto; */
}

.user-text-div {
    margin-right: 1vh;

    overflow: auto;


    border: 2px solid;
    border-radius: 5px;
    color: black;
    
    position: relative;
    background-color: rgba(201, 201, 201, 0.378);
    transition: border-color 0.3s ease-out;
    width: 510px;
    width: 84vh;
    position: relative;
    height: 200px;
}


.user-text {
    margin-right: 1vh;
    margin-bottom: -10px;
    border: 2px solid;
    border-radius: 5px;
    color: black;
    transition: border-color 0.3s ease-out;
    width: max(95%, 15vh) !important;
    height: 200px;

    /* height: calc(15vh - 4px) !important; */
}

.title-area {
    border-radius: 5px;
    width: 25rem;
    text-align: justify;
    font-size: 18px;
    background-color: #D5CCF8;
    margin-left: 13px;
    margin-bottom: 5px;
}

.text-dash {
    margin-left: 15%;
    width: calc(84% - 10px);
    justify-content: center;
    position: relative;
    bottom: 0;
    top: -20px;
    display: inline-block;
    max-width: 100%;
}


.output-user {
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 2px;
    border-radius: 1%;
    height: 100%;

    display: grid;
    grid-template-rows: auto;
}

.input-us {
    width: 50%;
    float: left;
}


.loading {
    color: red
}

.submit-story {
    margin-right: 6vw;
    top: 5px;
    position: relative;
    background-color: #9d2bb4;
    border: none;
}

.clear-story {
    background-color: blueviolet;
}

.avaliacao {
    margin-left: 15%;
    width: calc(84% - 10px);
    float: right;
    justify-content: center;
    /* margin-left: 250px; */
    position: absolute;
    bottom: 0;
    top: 0;
    max-width: 100%;
}

.grid-text-style {
    margin-top: 10vh;
    max-width: 100%;
    display: flex;
}

.column-output {
    position: absolute;
}

::placeholder {
    color: rgb(36, 32, 32);
}



.user-text:hover {
    border-color: rgb(201, 14, 207);
    transition-delay: 0.2s;
}

.side-t {
    height: 100%;
    width: 255px;
    z-index: 1;
    top: 0;
    left: 0;
    padding-top: 20px;
}

@media screen and (max-height: 750px) {
    /* .user-text {
        margin-right: 1vh;
        border-radius: 5px;
        transition: border-color 0.3s ease-out;
        width: max(95%, 15vh) !important;
        height: max(75%, 15vh) !important;
    } */


    .user-text-div {
        margin-right: 1vh;
        border: 2px solid;
        border-radius: 5px;
        color: black;
        position: relative;
        transition: border-color 0.3s ease-out;
        width: 510px;
        position: relative;

        height: 200px;
    }

    .submit-story {
        position: relative;
        /* bottom: 1%; */
        /* top: -120px; */
    }


    .pos-button {
        margin-left: 16%;
        display: flex;
        justify-content: center;
        margin-right: 8rem;
    }

}

.c-loader {
    animation: is-rotating 1s infinite;
    border: 6px solid #e5e5e5;
    border-radius: 50%;
    border-top-color: #51d4db;
    height: 50px;
    width: 50px;

    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999;
}



@keyframes is-rotating {
    to {
        transform: rotate(1turn);
    }
}
</style>
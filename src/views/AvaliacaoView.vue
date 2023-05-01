<template>
    <div class="avaliacao">
        <div class="grid-text-style">
            <div>
                <Textarea v-model="prototype.input_us" class="user-text" placeholder="input user story" autoResize rows="25"
                    cols="100" />
            </div>
            <div class="output-user">
                <div>
                    <Textarea v-model="prototype.pattern_suggestion" class="user-text" :disabled="true" placeholder="output user story" autoResize rows="12.5"
                        cols="100" />
                </div>
                <div>
                    <Textarea class="user-text" :disabled="true" placeholder="output user story" autoResize rows="12.5"
                        cols="100" />
                </div>
            </div>
        </div>
        <my-button class="submit-story" label="Submit" @click="sendRequest(prototype.input_us)" />
        <my-button class="submit-story" label="Clear" @click="clear()" />
    </div>
</template>
  
<script>
import Textarea from 'primevue/textarea';
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
            modelAdd: false,
            modelUpdate: false,
            prototype: {
                input_us: '',
                pattern_suggestion: null,
                smells_id: null
            },
        }
    },
    computed: {

    },
    methods: {
        sendRequest(prototipo) {
            const formData = new FormData();
            formData.append('prompt', prototipo);
            //   formData.append('campo2', 'valor2');
            console.log(Array.from(formData.entries()));

            axios({
                url: 'http://127.0.0.1:5000/historias',
                method: 'POST',
                data: formData
            })
                .then(response => {
                    console.log(response.data),
                    this.prototype.pattern_suggestion = this.extrair(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        },
        clear() {
            this.prototype.input_us = ""
            this.prototype.pattern_suggestion=null
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
            formData.append('prompt', prototipo);
            //   formData.append('campo2', 'valor2');
            console.log(Array.from(formData.entries()));

            axios({
                url: 'http://127.0.0.1:5000/historias',
                method: 'GET'
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    components: {
        Textarea,
    }
}

</script>
  
<style>
.submit-story {
    float: right;
    margin-right: 5vw;
}



.avaliacao {
    margin-left: 15%;
    width: 84%;
    float: right;
    justify-content: center;
    /* margin-left: 250px; */
    position: absolute;
    bottom: 0;
    top: 0;
}

.grid-text-style {
    margin-top: 10vh;
    max-width: 100%;
    display: flex;
    justify-content: center;
}

.output-user {
    /* display: grid; */
    grid-template-rows: auto;
}

.column-output {
    position: absolute;
}

.user-text {
    margin-right: 1vh;
    border: 2px solid;
    border-radius: 5px;
    transition: border-color 0.3s ease-out;
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
</style>
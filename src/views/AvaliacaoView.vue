<template>
    <div style="position: relative;">
        <!-- <my-Loading class="loading" :active='isLoading' :is-full-page="fullPage" :loader='loader' /> -->
        <div class="avaliacao">
            <div class="grid-text-style">
                <div class="c-loader " :style="{ display: isLoading ? 'block' : 'none' }">
                </div>
                <div style="display: flexbox;">
                    <Textarea v-model="prototype.input_us" class="user-text" placeholder="input user story" autoResize
                        rows="25" cols="100" />
                </div>
                <!-- <my-button class="submit-story" label="Submit" @click="sendRequest(prototype.input_us)" /> -->
                <div class="output-user">
                    <!-- <span>s</span> -->
                    <div>
                        <Textarea v-model="prototype.pattern_suggestion" class="user-text" readonly
                            placeholder="output user story" autoResize rows="12.5" cols="100" />
                    </div>
                    <!-- <span>s</span> -->
                    <div>
                        <Textarea v-model="prototype.smells_id" class="user-text" readonly placeholder="Requirements smells"
                            autoResize rows="6" cols="100" />
                    </div>
                </div>
            </div>
            <my-button class="submit-story" label="Submit" @click="sendRequest(prototype.input_us)" />


        </div>

        <LoaderView v-show="isLoading" />
    </div>
</template>
  
<script>
import Textarea from 'primevue/textarea';
import LoaderView from './LoaderView.vue';
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
            this.isLoading = true
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
                        this.prototype.pattern_suggestion = response.data.historia.trimStart(),
                        console.log(this.prototype.pattern_suggestion)
                    this.prototype.smells_id = this.removeSpaces(response.data.smell).trimStart(),
                        this.isLoading = false
                    // this.getResponse(this.prototype.pattern_suggestion)

                })
                .catch(error => {
                    console.error(error);
                });

        },
        removeSpaces(text) {
            let startIndex = text.indexOf('\n\n') + 2
            return text.slice(startIndex)
        },
        clear() {
            this.prototype.input_us = ""
            this.prototype.pattern_suggestion = null
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

    },
    components: {
        Textarea,
        LoaderView
    }
}

</script>
  
<style>
/* .submit-story { 
    float: right; 
    margin-right: 25vw; 
    display: flex;
    height: 5vh;
    width: 10vh;
    position: relative;
    top: max(15vh, 250px);
    font-size: min(18px, 2vh);
} */
.loading {
    color: red
}

.submit-story {
    margin-right: 6vw;
    top: 10px;
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
    width: max(95%, 15vh) !important;
    /* height: calc(15vh - 4px) !important; */
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
    .user-text {
        margin-right: 1vh;
        border-radius: 5px;
        transition: border-color 0.3s ease-out;
        width: max(95%, 15vh) !important;
        height: max(75%, 15vh) !important;
    }

    .submit-story {
        position: relative;
        bottom: 20%;
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
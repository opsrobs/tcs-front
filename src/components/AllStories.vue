<template>
    <div style="background-color: #F2EFFA;">
        <div style="margin-left: 16%; margin-right: 1%; background-color: #F2EFFA;">
            <SidebarView />
            <div class="us-title">
                <span> Acompanhe aqui seu historico de User Story</span>
            </div>
            <br />
            <div class="details-content">
                <div v-for="storieWithDetails in storieWithDetails" :key="storieWithDetails.id">
                    <div class="register-details" style="text-align: justify;">
                        <div style="margin: 10px;">
                            <span style="font-weight: bold;">User Story: </span>
                            <span class="us_content">{{ storieWithDetails.story_input }}</span><br />
                            <span style="font-weight: bold;">User Story Padronizada: </span>
                            <span class="us_content">{{ storieWithDetails.story_pattern }}</span><br />
                            <span style="font-weight: bold;">Descrição do Smell: </span>
                            <span style="text-align: justify; color: rgb(62, 51, 51);">{{
                                removerCorrecao(storieWithDetails.details) }}</span><br />
                            <span style="font-weight: bold;">Sugestão de correção: </span>
                            <span class="us_content">{{ obterCorrecao(storieWithDetails.details) }}</span>

                        </div>
                    </div>
                    <Divider align="left" type="solid" />
                </div>
                <my-button style="background-color: #9d2bb4;" id="close-register" class=" pi pi-history" @click="registerView()" label=" Voltar" />

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, defineProps, defineEmits, toRefs } from "vue";
import Divider from 'primevue/divider';
import SidebarView from '../components/SidebarView.vue';


const axios = require('axios');



// const isLoading = ref(true);
const isNotError = ref(true);
const total_us = ref(0);
// const chartData = ref();
const token = ref('');
// const chartOptions = ref();
// const smellsList = ref([]);
let stories = ref([]);
let smellDetails = ref([]);
let storieWithDetails = ref([]);
const props = defineProps({
    isRegister: {
        type: Boolean,
        required: true
    }
});
const { valid } = toRefs(props);
const emit = defineEmits(['update:isRegister']);
function registerView() {
    emit('update:isRegister', !props.isRegister);
    console.log(valid)
}


onMounted(async () => {
    await Promise.all([fetchStories(), sugests()]);
    unionData();

});


computed(() => {
    return null;
})


function obterCorrecao(texto) {
    var correcaoIndex = texto.indexOf("Correção:");

    if (correcaoIndex === -1) {
        return "Correção não encontrada no texto.";
    }

    var correcaoTexto = texto.substring(correcaoIndex + "Correção:".length).trim();
    return correcaoTexto;
}

function removerCorrecao(texto) {
    var correcaoIndex = texto.indexOf("Correção:");

    if (correcaoIndex === -1) {
        return "Correção não encontrada no texto, portanto retornando o texto completo.";
    }

    var textoSemCorrecao = texto.substring(0, correcaoIndex).trim();
    return textoSemCorrecao;
}

const setToken = () => {
    token.value = localStorage.getItem('token');
    return token.value
}
async function fetchStories() {
    setToken()
    try {

        const response = await axios.get(`http://127.0.0.1:5000/gethistorias?token=${token.value}`);
        const responseData = response.data;
        stories.value = responseData;
        sugests()
        total_us.value = Array.isArray(responseData) ? responseData.length : Object.keys(responseData).length;
    } catch (error) {
        isNotError.value = false;
        console.error('Erro ao buscar as histórias:', error);
    }
}
async function sugests() {
    setToken()
    try {
        const response = await axios.get(`http://127.0.0.1:5000/gpt_has_smell?token=${token.value}`);
        const responseData = response.data;
        smellDetails.value = responseData;
        total_us.value = Array.isArray(storieWithDetails.value) ? storieWithDetails.value.length : Object.keys(storieWithDetails.value).length;
        unionData()
    } catch (error) {
        isNotError.value = false;
        console.error('Erro ao buscar as histórias:', error);
    }
}
function unionData() {
    storieWithDetails.value = [];
    let lastId = 0;
    let cont =0;
    for (const smell of smellDetails.value) {
        if(lastId == smell.id_gpt){
            console.log("")
        }else{
            stories.value.forEach((element) => {
                if (element.id == smell.id_gpt) {
                    storieWithDetails.value.push({
                        details: smell.descricao_smell,
                        id: smell.id,
                        gpt: smell.id_gpt,
                        story_input: element.UserStorie,
                        story_pattern: element.UserStoriePadronizada
                    });
                    lastId = smell.id_gpt
                }
            });
        }
        cont++

    }
    console.log(cont)


    storieWithDetails.value.sort((a, b) => b.id - a.id);

}

</script>
<style>
#close-register {
    top: 20px;
    border: 2px;
    position: fixed;
    right: 25px;
}

.us-title {
    padding-top: 20px;
    font-weight: bold;
    font-size: 18px;
}

.register-details {
    border-radius: 10px;
    background-color: #F2EFFA;
    transition: box-shadow 0.3s ease;
}

.register-details:hover {
    box-shadow: 0px 0px 10px rgba(215, 18, 212, 0.2);
}

.details-content {
    margin: 5px;
}
</style>
<template>
    <div>
        <SidebarView />
        <div v-if=isRegister>
            <AllStories v-model:isRegister="isRegister" />
        </div>
        <div v-else>

            <div class="big-number">
                <span class="desc-total-users">Total de user stories avaliadas </span>
                <span class="total_users" v-tooltip.right="'Quantidade de User Stories'"> {{ total_us }}</span>
            </div>
            <div class="charts-dash">
                <div class="cards-chart">
                    <div class="c-loader " :style="{ display: isLoading ? 'block' : 'none' }">
                    </div>
                    <div class="card" id="chart-user" style="border: 1px dashed;">
                        <div v-if="isNotError">
                            <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
                        </div>
                        <div v-else>
                            <Message severity="error" :closable="false"> {{ error_content }}</Message>
                            <img src="../components/resources/error-robot.png" alt="Erro ao obter grafico" width="300"
                                height="300" />
                        </div>
                    </div>
                    <div class="top-users" style="border: 1px dashed;">
                        <span v-for="storieWithDetails in topThreeStories" :key="storieWithDetails.id">
                            <div style="text-align: justify;">
                                <div style="margin-left: 5px; margin-right: 5px;">
                                    <div class="input-request-us">
                                        <span class="us_content">{{ storieWithDetails.story_input }}</span><br />
                                        <span style="text-align: justify; color: rgb(62, 51, 51);">{{
                                            removerCorrecao(storieWithDetails.details) }}</span><br />
                                    </div>
                                    <div class="output-request-us">
                                        <a style="font-style: oblique; color: black;">Sugestão de correção:</a><br />
                                        <span class="us_content">{{ obterCorrecao(storieWithDetails.details) }}</span>
                                    </div>
                                </div>
                            </div>
                            <Divider align="left" type="solid" />
                        </span>
                    </div>

                </div>
            </div>
            <LoaderView v-show="isLoading" />
            <div class="b-register">
                <my-button style="background-color: #9d2bb4;" @click="registerView()" label="Ver Historico" />
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import LoaderView from '../components/LoaderView.vue';
import AllStories from '../components/AllStories.vue';
import SidebarView from '../components/SidebarView.vue';
import Chart from 'primevue/chart';
const axios = require('axios');
import Message from 'primevue/message';
import Divider from 'primevue/divider';

onMounted(() => {
    fetchSmells();
    fetchStories();
});

const isLoading = ref(true);
const isNotError = ref(true);
const isRegister = ref(false);
const total_us = ref(0);
const chartData = ref();
const token = ref('');
const chartOptions = ref();
const smellsList = ref([]);
let stories = ref([]);
let smellDetails = ref([]);
let storieWithDetails = ref([]);
let error_content = ref();


async function fetchSmells() {
    setToken()
    try {
        const response = await axios.get(`http://127.0.0.1:5000/get_smell_status?token=${token.value}`);
        smellsList.value = response.data;
        isLoading.value = false;
        chartData.value = setChartData(smellsList.value);
        console.log(response.data) // <---- arrumar
        sugests();

    } catch (error) {
        isNotError.value = false;
        isLoading.value = false;
        console.log(error);
        console.error('Erro ao buscar os smells:', error);
        error_content.value = '\nErro ao buscar os smells: ' + error.message;
    }
}
function validateText(text) {
    if (text.length <= 100) {
        return text;
    } else {
        const trimmedText = text.substring(0, 100);
        const lastSpaceIndex = trimmedText.lastIndexOf(' ');
        const shortenedText = trimmedText.substring(0, lastSpaceIndex) + '...';
        return shortenedText;
    }
}

function registerView() {
    return isRegister.value = !isRegister.value
}

const topThreeStories = computed(() => {
    const totalStories = storieWithDetails.value.length;
    const startIndex = Math.max(totalStories - 2, 0);
    return storieWithDetails.value.slice(startIndex).sort((a, b) => b.id - a.id);
});

function obterCorrecao(texto) {
    var correcaoIndex = texto.indexOf("Correção:");

    if (correcaoIndex === -1) {
        return validateText(correcaoIndex);
    }

    var correcaoTexto = texto.substring(correcaoIndex + "Correção:".length).trim();
    return validateText(correcaoTexto);
}

function removerCorrecao(texto) {
    var correcaoIndex = texto.indexOf("Correção:");

    if (correcaoIndex === -1) {
        return validateText(correcaoIndex);
    }

    var textoSemCorrecao = texto.substring(0, correcaoIndex).trim();
    return validateText(textoSemCorrecao);
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
        stories.value = [];

        for (const story of responseData) {
            stories.value.push({
                id: story.id,
                historia_input: story.UserStorie,
                historia_output: story.UserStoriePadronizada
            });
        }
        total_us.value = Array.isArray(responseData) ? responseData.length : Object.keys(responseData).length;
    } catch (error) {
        isNotError.value = false;
        console.error('Erro ao buscar as histórias:', error);
    }
}


async function sugests() {
    setToken()
    let lastId = 0;
    try {
        const response = await axios.get(`http://127.0.0.1:5000/gpt_has_smell?token=${token.value}`);
        const responseData = response.data;
        smellDetails.value = [];
        storieWithDetails.value = []
        for (const smell of responseData) {
            smellDetails.value.push({
                details: smell.descricao_smell,
                id: smell.id,
                gpt: smell.id_gpt,
                smell_id: smell.id_smell
            });
            if (lastId == smell.id_gpt) {
                console.log(true)
            } else {
                stories.value.forEach((element) => {
                    if (element.id == smell.id_gpt) {
                        storieWithDetails.value.push({
                            details: smell.descricao_smell,
                            id: smell.id,
                            gpt: smell.id_gpt,
                            story_input: element.historia_input
                        });
                        lastId = smell.id_gpt
                    }
                });
            }
        }
        total_us.value = Array.isArray(storieWithDetails.value) ? storieWithDetails.value.length : Object.keys(storieWithDetails.value).length;
    } catch (error) {
        isNotError.value = false;
        console.error('Erro ao buscar as histórias:', error);
    }
}



function setChartData(smells) {
    const documentStyle = getComputedStyle(document.documentElement);
    const labels = [];
    const valores = [];

    for (const chave in smells) {
        const chaveFormatada = addLineBreaksToKey(chave);
        labels.push(chaveFormatada);
        valores.push(smells[chave]);
    }
    labels.sort((a, b) => a.length - b.length);

    return {
        labels,
        datasets: [
            {
                label: 'Smells identificados',
                data: valores,
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.6
            }
        ]
    };
}

function addLineBreaksToKey(chave) {
    return chave.replace(/,/g, ',\n');
}


function setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

setChartOptions();
</script>
<style>
.desc-total-users {
    font-size: max(1.5rem, 24px);
}

.b-register {
    margin-top: 20px;
    margin-right: 30px;
    float: right;
}

.input-request-us {
    color: red;
}

.output-request-us {
    color: green;
    margin-top: 3px;
}

.charts-dash {
    margin-left: 15%;
    width: calc(84% - 10px);
    justify-content: center;
    position: relative;
    bottom: 0;
    display: inline-block;
    max-width: 100%;
}

#chart-user {
    margin: 2px;
    border-radius: 1%;
}

.top-users {
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 2px;
    border-radius: 1%;
    height: 100%;

    display: grid;
    grid-template-rows: auto;
}

.us_content {
    margin: 3px;
    text-align: justify;
}

.cards-chart {
    position: relative;
    top: 2vh;
    display: grid;
    margin: 3px;
    grid-template-columns: repeat(2, 1fr);
    /* grid-auto-rows: 200px; */
}

.big-number {
    font-family: 'Kalam', cursive;
    /* font-family: 'Montserrat', sans-serif; */
    font-size: max(2.5rem, 44px);
    font-weight: 600;
    position: relative;
    float: right;
    margin-right: max(4vh, 30px);
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
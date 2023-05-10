<template>
    <div>
        <span class="big-number" v-tooltip.right="'Quantidade de User Stories consultadas.'"> {{ total_us }}</span>
        <div class="charts-dash">
            <div class="cards-chart">
                <div class="c-loader " :style="{ display: isLoading ? 'block' : 'none' }">
                </div>

                <div class="card" id="chart-user">
                    <div v-if="isNotError">
                        <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
                    </div>
                    <div v-else>
                        <img src="../components/resources/error-robot.png" alt="Erro ao obter grafico" width="300"
                            height="300" />
                    </div>
                </div>
                <div class="top-users">
                    <span v-for="story in topThreeStories" :key="story.id">
                        <div style="text-align: justify;">
                            <span class="us_content" style="margin: 2px;">{{ story.historia_input }}</span>
                        </div>
                    </span>
                </div>

            </div>
        </div>
        <LoaderView v-show="isLoading" />
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import LoaderView from './LoaderView.vue';
import Chart from 'primevue/chart';
const axios = require('axios');

onMounted(() => {
    fetchSmells();
    fetchStories()
});

const isLoading = ref(true);
const isNotError = ref(true);
const total_us = ref();
const chartData = ref();
const chartOptions = ref();
const smellsList = ref([]);
let stories = ref([]);


async function fetchSmells() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/get_smell_status');
        smellsList.value = response.data;
        isLoading.value = false;
        chartData.value = setChartData(smellsList.value);
    } catch (error) {
        isNotError.value = false;
        isLoading.value = false;
        console.error('Erro ao buscar os smells:', error);
    }
}

const topThreeStories = computed(() => {
  const totalStories = stories.value.length;
  const startIndex = Math.max(totalStories - 3, 0);
  return stories.value.slice(startIndex);
});


async function fetchStories() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/gethistorias');
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



function setChartData(smells) {
    const documentStyle = getComputedStyle(document.documentElement);
    const labels = [];
    const valores = [];

    for (const chave in smells) {
        labels.push(chave);
        valores.push(smells[chave]);
    }

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
    border: 1px dashed;
    border-radius: 1%;
}

.top-users {
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 2px;
    border: 1px dashed;
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
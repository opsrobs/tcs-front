<template>
    <div>
        <span class="big-number"> Quantidade de Historias Avaliadas {{ total_us }}</span>
        <div class="charts-dash">
            <div class="cards-chart">
                <div class="c-loader " :style="{ display: isLoading ? 'block' : 'none' }">
                </div>

                <div class="card ">
                    <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
                </div>
                <div class="card">
                    <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
                </div>
                <div class="card ">
                    <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
                </div>
                <div class="card">
                    <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
                </div>

            </div>
        </div>
        <LoaderView v-show="isLoading" />

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LoaderView from './LoaderView.vue';
import Chart from 'primevue/chart';
const axios = require('axios');



onMounted(() => {
    fetchSmells()
    // chartData.value = setChartData(smellsList);
    chartOptions.value = setChartOptions();
});
let isLoading = ref(true);
const total_us = ref(20)
const chartData = ref();
const chartOptions = ref();
let smellsList = [];


async function fetchSmells() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/get_smell_status'); // Substitua "URL_DA_API" pela URL correta da sua API
        const smells = response.data; // Supondo que a resposta da API seja um array de objetos com os atributos 'qtd' e 'nome'
        smellsList = smells;
        console.log(smellsList)
        isLoading.value = false;
        chartData.value = setChartData(smellsList);
    } catch (error) {
        console.error('Erro ao buscar os smells:', error);
    }
}


const setChartData = (smell) => {
    let dados = [];

    const documentStyle = getComputedStyle(document.documentElement);

    for (let chave in smell) {
        const valor = smell[chave];

        dados.push({
            nome: chave,
            tot: valor
        });
    }

    let labels = [];
    let valores = [];

    for (let i = 0; i < dados.length; i++) {
        labels.push(dados[i].nome);
        valores.push(dados[i].tot);
    }
    console.log(labels)



    return {
        labels: labels,
        datasets: [
            {
                label: 'Smells identificados',
                data: valores,
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.6
            }
        ]
    };
};

const setChartOptions = () => {
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
</script>
<style>
.charts-dash {
    margin-left: 15%;
    width: calc(84% - 10px);
    /* float: right; */
    justify-content: center;
    /* margin-left: 250px; */
    position: relative;
    bottom: 0;
    /* top: max(10vh, 150px); */
    max-width: 100%;
}

.cards-chart {
    position: relative;
    top: 2vh;
    display: grid;
    margin: 3px;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
}

.big-number {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 2.5rem;
    font-weight: 600;
    position: relative;
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
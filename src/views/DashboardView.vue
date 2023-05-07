<template>
    <div>
        <span class="big-number"> Quantidade de Historias Avaliadas {{ total_us }}</span>
        <div class="charts-dash">
            <div class="cards-chart">
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
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';


onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const total_us = ref(20)
const chartData = ref();
const chartOptions = ref();



const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.4
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
        aspectRatio: 0.6,
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
</style>
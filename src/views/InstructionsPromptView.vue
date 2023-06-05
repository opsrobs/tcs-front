<template>
    <div class="cont">
        <!-- <div> -->
        <SidebarView />

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Instrução</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in instrucoes" :key="i.id">
                    <td>{{ i.id }}</td>
                    <td>{{ i.instrucao }}</td>
                    <td @click="instrucao = i">
                        <SplitButton label="Novo" @click="novo()" icon="pi pi-plus" :model="items"
                            href="javascript:void(0)">
                        </SplitButton>
                    </td>
                </tr>
                <!-- <ConfirmDialog @click="messageDialog(c)" defaultFocus="reject">
                </ConfirmDialog> -->

            </tbody>
        </table>
        
        <!-- <ConfirmDialog @click="messageDialog(c)" defaultFocus="reject">
                </ConfirmDialog> -->

        <label>Nova Instrução</label>
        <input v-model="novaInstrucao">
        <button @click="GetRequest()">CLICK</button>



    </div>
</template>
<script>
import axios from 'axios';
import SidebarView from '@/components/SidebarView.vue';
import SplitButton from 'primevue/splitbutton';
export default {
    data() {
        return {
            instrucoes: [],
            token: null,
            novaInstrucao: ''
        }
    },
    mounted() {
        this.setToken()

        axios({
            url: `http://127.0.0.1:5000/instrucao?token=${this.token}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response.data)
                this.instrucoes = response.data
            })
            .catch(error => {
                console.error(error);

            });
    },
    methods: {
        GetRequest() {
            this.setToken()

            axios({
                url: `http://127.0.0.1:5000/instrucao?token=${this.token}`,
                method: 'GET',
            })
                .then(response => {
                    console.log(response.data)
                    this.instrucoes = response.data
                })
                .catch(error => {
                    console.error(error);

                });
        },
        SendRequest() {
            this.setToken()
            const formData = new FormData();
            formData.append('instrucao', this.novaInstrucao);
            axios({
                url: `http://127.0.0.1:5000/novainstrucao?token=${this.token}`,
                method: 'POST',
                data: formData

            })
                .then(response => {
                    console.log(response.data)
                    this.instrucoes = response.data,
                        this.GetRequest()
                })
                .catch(error => {
                    console.error(error);

                });
        },
        DeleteRequest(id) {
            this.setToken()
            console.log(id)
            const formData = new FormData();
            formData.append('instrucao', this.novaInstrucao);
            axios({
                url: `http://127.0.0.1:5000/deleteinstrucao/${id}`,
                method: 'GET',
                data: formData

            })
                .then(response => {
                    console.log(response.data)
                    this.instrucoes = response.data,
                        this.GetRequest()
                })
                .catch(error => {
                    console.error(error);

                });
        },
        setToken() {
            this.token = localStorage.getItem('token');

        }
    },
    components: {
        SidebarView,
        SplitButton
    }
}
</script>
<style>
.cont {
    margin-left: 16%;
    margin-top: 1%;
    width: calc(84% - 10px);
    float: right;
    justify-content: center;
    /* margin-left: 250px; */
    /* position: absolute; */
    bottom: 0;
    top: 0;
    max-width: 100%;
}

li {
    display: flex;
    justify-content: left;
}

/* 
table {
    background-color: aqua
} */
</style>

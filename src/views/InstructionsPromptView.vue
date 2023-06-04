<template>
    <div>
        <SidebarView />
        <label>Nova Instrução</label>
        <input v-model="novaInstrucao">
        <button @click="DeleteRequest(novaInstrucao)" >CLICK</button>
        <div>
            {{ instrucoes }}
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import SidebarView from '@/components/SidebarView.vue';
export default {
    data() {
        return {
            instrucoes: [],
            token: null,
            novaInstrucao: ''
        }
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
        SidebarView
    }
}
</script>
<style></style>

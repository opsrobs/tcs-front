<template>
    <div class="cont">
        <!-- <div> -->
        <SidebarView />
        <Toast />
        <div class="center-div">
            <div v-show="habilitado" class="flex-container " style="margin-bottom: 3rem;">
                <Textarea id="edit-instrucao" v-model="novaInstrucao" autoResize rows="1" cols="400" />
                <div :class="classification" id="for-icons" @click="this.actionClick()">
                </div>
            </div>
            <Divider v-show="habilitado" align="left" type="solid" />

            <div class="instructions" v-for="i in instrucoes" :key="i.id">
                <div class="flex-container">
                    <Textarea v-model="i.instrucao" autoResize rows="1" :readonly="i.ativo" cols="400" />
                    <div class=" pi pi-trash" id="for-icons" @click="this.readisValid(i)">
                    </div>
                    <div class=" pi pi-plus" id="for-icons" @click="this.newInstruction()">
                    </div>
                </div>
                <Divider align="left" type="solid" />
            </div>

        </div>
        <ConfirmDialog @click="messageDialog(i)" defaultFocus="reject">
        </ConfirmDialog>
    </div>
</template>
<script>
import axios from 'axios';
import SidebarView from '@/components/SidebarView.vue';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast'
import Textarea from 'primevue/textarea';
import Divider from 'primevue/divider';

export default {
    data() {
        return {
            instrucoes: [],
            token: null,
            novaInstrucao: '',
            habilitado: false,
            classification: '',
            opcao: null,
            items: [
                {
                    label: 'Editar',
                    icon: 'pi pi-refresh',
                    command: () => {
                        this.editar(this.carro)
                        this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {
                        this.messageDialog(this.carro)
                    }
                }
            ]
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
        readisValid(i) {
            if (i.ativo === true) {
                this.$toast.add({ severity: 'error', detail: ' Não é possivel excluir instruções cadastradas pelo sistema!', life: 3000 })

            } else {
                this.messageDialog(i)
                this.habilitado = !this.habilitado
                this.novaInstrucao = i.instrucao

            }
        },
        newInstruction() {
            this.classification = 'pi pi-send'
            this.habilitado = !this.habilitado
            this.novaInstrucao

        },
        actionClick() {
            if (this.novaInstrucao != '') {
                this.SendRequest()
            } else {
                alert('invalido')
            }
        },
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
                        this.$toast.add({ severity: 'success', summary: 'Registro gravado', detail: 'Registro gravados com sucesso', life: 3000 }),
                        this.GetRequest(),
                        this.habilitado = !this.habilitado,
                        this.novaInstrucao = null

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

        },
        toastMessage(item) {
            return this.opcao == 1
                ? this.$toast.add({ severity: 'warn', summary: 'Delete', detail: item + ' deletado com sucesso!!', life: 3000 })
                : this.$confirm.close();

        },
        messageDialog(instrucao) {
            return instrucao != null ? this.$confirm.require({
                message: `Você deseja deletar "${instrucao.instrucao}"?`,
                header: 'Confirmar exclusão!!!',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sim',
                rejectLabel: 'Não',
                accept: () => {
                    this.excluir(instrucao)
                    this.opcao = 1
                    this.toastMessage(instrucao.instrucao)
                    this.$confirm.close();
                    //this.load()
                },
                reject: () => {
                    this.GetRequest()
                    this.$confirm.close()

                },
                onHide: () => {
                    this.GetRequest()
                    this.$confirm.close()
                }
            })
                : this.$confirm.close()
        },
        checkTextLength() {
            this.instrucoes.forEach(element => {
                console.log(JSON.stringify(element) + 'foreach')
            });
            return this.instrucoes.instrucao >= 35
                ? this.textLength = true
                : this.textLength = false
        }
    },
    components: {
        SidebarView,
        ConfirmDialog,
        Divider,
        Toast,
        Textarea
    }
}
</script>
<style>
.center-div{
    /* background-color: aqua; */
}
.flex-container {
    display: flex;
    align-items: center;
    /* Para alinhar verticalmente no centro */
}

#for-icons {
    margin: 6px 6px;
    cursor: pointer !important;
    
}

#edit-instrucao {
    border: 2px dashed red !important;
}

.flex-grow {
    flex-grow: 1;
    margin-right: 1rem;
}

.cont {
    margin-left: 16%;
    margin-top: 1%;
    width: 80%;
    width: calc(84% - 10px);
    bottom: 0;
    top: 0;
    max-width: 65%;
}
</style>

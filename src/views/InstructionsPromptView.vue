<template>
    <div class="cont">
        <!-- <div> -->
        <SidebarView />
        <Toast />
        <div class="center-div">
            <div v-show="habilitado" class="flex-container ">
                <Textarea ref="textareaElement" id="edit-instrucao" @paste="handlePaste" v-model="novaInstrucao" autoResize
                    rows="1" cols="400" />
                <div :class="classification" id="for-icons" @click="this.actionClick()">
                </div>
                <div class=" pi pi-times-circle" id="for-icons" @click="this.cancelNewInstruction()">
                </div>
            </div>
            <div v-show="habilitado">
                <br /><span class="tips" v-show="!lengthMin">Você precisa inserir ainda mais {{ size }} caracteres na
                    instrução</span>

            </div>

            <Divider v-show="habilitado" align="left" type="solid" />

            <div class="instructions" v-for="i in instrucoes" :key="i.id">
                <div class="flex-container">
                    <Textarea v-model="i.instrucao" autoResize rows="1" :readonly=true cols="400" />
                    <div v-if="!i.ativo">
                        <div class=" pi pi-trash" id="for-icons" @click="this.readisValid(i)">
                        </div>

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
            isSize: true,
            lengthMin: false,
            checked: false,
            valueOfReferer: 30,
            habilitado: false,
            classification: 'pi pi-send',
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
    computed: {
        textSize() {
            // if (this.novaInstrucao === null) {
            //     return ;
            // }
            console.log(this.novaInstrucao.length)
            return this.novaInstrucao.length > this.valueOfReferer;
        },
        size() {
            if (this.novaInstrucao === null) {
                return 0;
            }

            let numberString = this.novaInstrucao.length - this.valueOfReferer;
            const sizeOfText = numberString.toString();
            if (sizeOfText.startsWith('-') || sizeOfText <= 0) {
                console.log(Number(sizeOfText.substring(1)))
                if (Number(sizeOfText.substring(1)) <= 0) {
                    this.valueMin(true)
                }
                return Number(sizeOfText.substring(1));
            }
            console.log(Number(sizeOfText.substring(1)))
            return sizeOfText;
        }

    },
    methods: {
        validateText(text) {
            if (text.length <= 100) {
                return text;
            } else {
                const trimmedText = text.substring(0, 100);
                const lastSpaceIndex = trimmedText.lastIndexOf(' ');
                const shortenedText = trimmedText.substring(0, lastSpaceIndex) + '...';
                return shortenedText;
            }
        },
        valueMin(value) {
            return this.lengthMin = value
        },
        handlePaste(event) {
            event.preventDefault()
            this.$toast.add({ severity: 'warn', summary: 'Delete', detail: `Colagem de texto não permitida!`, life: 3000 })

        },
        readisValid(i) {
            if (i.ativo === true) {
                this.$toast.add({ severity: 'error', detail: ' Não é possivel excluir instruções cadastradas pelo sistema!', life: 3000 })

            } else {
                this.messageDialog(i)

            }
        },
        async GetRequest() {
            this.setToken()
            console.log("Entrou")
            await axios({
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
        cancelNewInstruction() {
            this.habilitado = false
            return
        },
        newInstruction() {
            this.habilitado = true
            this.novaInstrucao

            if (this.habilitado) {
                this.isSize = false
                this.$nextTick(() => {
                    this.$refs.textareaElement.$el.focus();
                });
            }

        },
        actionClick() {
            if (this.novaInstrucao != '' && this.novaInstrucao.length > 29 && !this.checked) {
                this.SendRequest()
                this.novaInstrucao = ''
                this.checked = true
                this.habilitado = false
            } else {
                this.$toast.add({ severity: 'warn', summary: 'Delete', detail: `Sua instrução precia de mais ${this.size} caracteres`, life: 3000 })
            }
        },

        async SendRequest() {
            this.setToken()
            const formData = new FormData();
            formData.append('instrucao', this.novaInstrucao);
            await axios({
                url: `http://127.0.0.1:5000/novainstrucao?token=${this.token}`,
                method: 'POST',
                data: formData

            })
                .then(response => {
                    console.log(response)
                    this.$toast.add({ severity: 'success', summary: 'Registro gravado', detail: 'Registro gravados com sucesso', life: 3000 }),
                        this.GetRequest(),
                        this.novaInstrucao = null

                })
                .catch(error => {
                    console.error(error);

                });
        },
        async DeleteRequest(id) {
            this.setToken()
            console.log(id)
            const formData = new FormData();
            formData.append('instrucao', this.novaInstrucao);
            await axios({
                url: `http://127.0.0.1:5000/deleteinstrucao/${id}`,
                method: 'GET',
                data: formData

            })
                .then(response => {
                    console.log(response.data)
                    this.instrucoes = response.data,
                        this.GetRequest(),
                        this.novaInstrucao = null
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
                    this.DeleteRequest(instrucao.id)
                    this.opcao = 1
                    this.GetRequest()
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
.tips {
    font-size: 12px;
    margin-left: 15px;
    float: left !important;
    margin-top: -20px;
    color: red;
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
    border-bottom: 2px dashed red !important;
    border-radius: 10px;
}

.flex-grow {
    flex-grow: 1;
    margin-right: 1rem;
}

.cont {
    margin-left: 16%;
    width: 80%;
    width: calc(84% - 10px);
    bottom: 0;
    top: 0;
    max-width: 65%;
}
</style>

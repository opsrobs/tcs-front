<template>
    <div class="avaliacao">
        <div class="input-user">
            <div class="side-t"></div>
            <div>
                <Textarea class="user-text" placeholder="input user story" autoResize rows="25" cols="100" />
            </div>
            <div class="output-user">
                <div>
                    <Textarea class="user-text" :disabled="true" placeholder="output user story" autoResize rows="12.5"
                        cols="100" />
                </div>
                <div>
                    <Textarea class="user-text" :disabled="true" placeholder="output user story" autoResize rows="12.5"
                        cols="100" />
                </div>
            </div>
        </div>
        <my-button class="submit-story" label="Submit" />
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import Textarea from 'primevue/textarea';

// import Button from 'primevue/button';
export default defineComponent({
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
            modelAdd: false,
            modelUpdate: false,
            data: {
                id: "",
                name: "",
                description: ""
            }
        }
    },
    computed: {

    },
    methods: {


    },
    components: {
        Textarea,
    }
})

</script>
  
<style>
.submit-story {
    float: right;
    margin-right: 5vw;
}


.avaliacao {
    width: 100%;
}

.input-user {
    margin-top: 10vh;
    margin-left: 6vh;
    max-width: 100%;
    display: flex;
}

.output-user {
    display: grid;
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
</style>
<template>
    <div class="overlay"></div>
</template>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Cor de fundo semi-transparente */
  z-index: 9998; /* Um valor menor do que o z-index do .c-loader */
}
</style>
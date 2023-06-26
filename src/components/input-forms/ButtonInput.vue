<template>
  <button :style="`width:${size ? size : ''}; background:${bgColor ? bgColor : ''}; color:${color? color : ''}`">
    {{ text }}
  </button>
</template>
<script>
import { stringifyQuery } from 'vue-router';

  export default {
    name: "Input-Button",
    props: {
      text: String,
      size: String,
      bgColor: String,
      color: String,
      onClik: Function,
    },
    methods: {},
  };
</script>
<style>
  button {
    height: 3.5rem;
    width: 100%;
    font-size: 1.3rem;
    cursor: pointer;
  }
</style>

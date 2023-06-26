<template>
  <label class="input-container" :name="label">
    <input :type="type" :placeholder="placeholder" :name="label" v-model="value" @focusout="onChange"/>
    <span
      v-if="type === 'password'"
      @click="showPassword"
      class="is-visible-icon"
      :style="`background-image: url('${isVisibleIcon}')`"
    >
    </span>
  </label>
</template>
<script>
  import eyesOpen from "../../assets/eye.png";
  import eyesClose from "../../assets/close-eye.png";
  export default {
    name: "Input-Text",
    props: {
      type: String,
      placeholder: String,
      label: String,
      onChange: Function,
    },
    data() {
      return {
        value: '',
        isVisibleIcon: eyesClose,
      };
    },
    methods: {
      getValue(){
        this.$emit('valor diditado ?',this.value)
      },
      showPassword(e) {
        let inputPassword = e.target.previousSibling;
        if (inputPassword.getAttribute("type") === "password") {
          inputPassword.setAttribute("type", "text");
          this.isVisibleIcon = eyesOpen
        } else {
          inputPassword.setAttribute("type", "password");
          this.isVisibleIcon = eyesClose
        }
      },
    },
  };
</script>
<style scoped>
  .input-container {
    display: flex;
    align-items: center;
    width: min(80vw, 500px);
    margin-block: 10px;
    border-radius: 5px;
    border: 1px solid rgb(0, 0, 0);
  }

  input,
  .is-visible-icon {
    height: 3.5rem;
    line-height: 3.5rem;
    background: none;
    padding: 0 15px;
  }

  input {
    border: none;
    flex: 2;
  }

  .is-visible-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 15%;
    cursor: pointer;
    background-size: 60% !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
  }
</style>

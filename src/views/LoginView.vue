<template>
  <div class="login-view">
    <div class="login-container">
      <TextInput
        type="text"
        ref="username"
        label="nome"
        placeholder="user.name"
      />
      <span class="msgError" v-if="usuarioInvalido">Usuario não encontrado</span>
      <TextInput
        type="password"
        ref="password"
        label="senha"
        placeholder="******"
      />
      <span class="msgError" v-if="passwordIncorreta">Senha incorreta</span>
      <ButtonInput
        text="Login"
        :onClick="login"
        bgColor="#9a0531"
        color="#fff"
      />
      <span>Não possui login? <a href="/sign-up">Crie o seu aqui</a></span>
    </div>
  </div>
</template>
<script>
  import TextInput from "../components/input-forms/TextInput.vue";
  import ButtonInput from "../components/input-forms/ButtonInput.vue";

  import { mapState, mapActions } from "pinia";
  import { useUserStore } from "../stores/user";
  export default {
    components: {
      TextInput,
      ButtonInput,
    },
    computed: {
      ...mapState(useUserStore, {
        logged: "isLogged",
      }),
    },
    data() {
      return {
        usuarioInvalido: false,
        passwordIncorreta: false,

      };
    },
    methods: {
      ...mapActions(useUserStore, ["getLoginData", "userSignIn", "userLogout"]),
      login() {
        const username = this.$refs.username.value;
        const password = this.$refs.password.value;

        this.userSignIn(username, password);
        setTimeout(() => {
          this.logged ? this.$router.push("/clients") : "";
        }, 1000);

        switch(this.userSignIn(username, password)){
          case 'usuario invalido':
            this.usuarioInvalido = true
            break;
            case 'senha invalida':
              this.passwordIncorreta = true
              default:
                break
        }
        
      },
     
    },
    mounted() {
      this.getLoginData();
    },
  };
</script>

<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 42px 20px 26px 20px;
    background: #fff;
    height: max-content;
  }

  .login-view {
    background: var(--primaria) !important;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    width: 150px;
    margin-top: 20px;
    text-align: center;
  }

  span a {
    display: inline-flex;
    margin-top: 10px;
  }
  .msgError{
    width: 100%;
    margin-block: -5px 15px;
    text-align: left;
    color: #d30000;
  }
</style>

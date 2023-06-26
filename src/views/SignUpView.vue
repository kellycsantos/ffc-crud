<template>
  <div class="login-view">
    <div class="login-container">
      Cadastro
      <TextInput type="text" ref="firstname" label="firstname" placeholder="Maria Santos" @change="isValidName"/>
      <TextInput type="text" ref="username" label="nome" placeholder="user_name" @change="isValidUser" :class="validUsername ? '': 'invalido'"/>
      <TextInput type="password" ref="password" label="senha" placeholder="******" @change="isValidPass" :class="validPassword ? '': 'invalido'"/>
      <ButtonInput text="Cadastrar" :onClick="validPassword && validUsername && validName ? signUp : ''" bgColor="#9a0531" color="#fff"/>   
      <span>Já possui login? <a href="/">Entre aqui</a></span> 
    </div>
  </div>
</template>
<script>
import TextInput from '../components/input-forms/TextInput.vue';
import ButtonInput from '../components/input-forms/ButtonInput.vue';

import { passwordIsValid, usernameIsValid } from '../helpers';

import { mapState,mapActions } from 'pinia'
import {useUserStore} from '../stores/user'
export default{
  name: 'SignUp',
  components:{
    TextInput,
    ButtonInput
  },
  computed:{
    ...mapState(useUserStore,{
      nickname: 'name',
      users: [
    {
        "username": "username 1",
        "password": "password 1",
        "name": "name 1",
        "email": "Jaeden_MacGyver@yahoo.com",
        "id": "1"
    },
    {
        "username": "username 2",
        "password": "password 2",
        "name": "name 2",
        "email": "Shyanne_Kautzer@hotmail.com",
        "id": "2"
    },
    {
        "username": "username 3",
        "password": "password 3",
        "name": "name 3",
        "email": "John_Bergstrom55@gmail.com",
        "id": "3"
    },]
    })
  },
  data(){
    return{
      validPassword: true,
      validUsername: true,
      validName: true,
    }
  },
  methods:{
    ...mapActions(useUserStore,
      ['getLoginData','userSignIn','userSignUp']
    ),
    signUp(){
     const firstname = this.$refs.firstname.value
     const username = this.$refs.username.value
     const password = this.$refs.password.value
    
    this.userSignUp(firstname,username,password)
    },

    isValidName(){

    },
    isValidUser(){
      this.validUsername =  usernameIsValid(this.users,this.$refs.username.value) == 'valido' ? true : false
    },
    isValidPass(){
     this.validPassword =  passwordIsValid(this.$refs.password.value) == 'valido' ? true : false
    },
  },
  mounted(){
    this.getLoginData()
  }
}
</script>

<style scoped>
.invalido{
  border: 1px solid red;
}
.valido{
  border: 1px solid rgb(30, 255, 0);
}
.login-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  padding: 42px 20px 26px 20px;
  background: #fff;
  height: max-content;
}

.login-view{
  background: var(--primaria) !important;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

span{
  width: 150px;
  margin-top: 20px;
  text-align: center;
}

span a{
  display: inline-flex;
  margin-top: 10px;
}
</style>
import { defineStore } from "pinia";
import axios from "axios";

import {userExist} from '../helpers/index'

const baseAPi = "https://649480300da866a95367e0fd.mockapi.io/";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      loginData: [],
      userInfo: [],
      isLogged: false
    };
  },
  actions: {
    async getLoginData() {
      try {
        const response = await axios.get(`${baseAPi}/user`);
        this.loginData = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async userSignUp(name,username,password){
      try{
        await axios.post(`${baseAPi}/user`, 
          {
            name: name,
            username: username,
            password: password
        })
      }catch(e){}
    },

    userSignIn(username,password){
     switch(userExist(this.loginData, username, password)){
      case 'success':
        this.isLogged = true
        break;
      case 'invalid user':
        return 'usuario invalido'
        case 'invalid password':
          return 'senha invalida'
     }
     this.userInfo = this.loginData.filter(login => login.username == username)     
    },
    userLogout(){
      this.isLogged = false
    }


  },
});

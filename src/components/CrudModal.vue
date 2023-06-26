<template>
  <div class="modal">
    <div class="form-container">
      <input type="text" placeholder="nome" v-model="nome" />
      <input type="text" placeholder="data nasci. 30/12/2019" v-model="dataNasc" @change="isData(dataNasc)"/>
      <input type="text" placeholder="cpf" v-model="cpf" @change="isCPF(cpf)" />
      <input type="text" placeholder="rg" v-model="rg" />
      <input type="text" placeholder="data exp" v-model="dataExp" />
      <input
        type="text"
        class="uppercase"
        placeholder="orgão exp."
        v-model="orgaoExp"
      />
      <input type="text" class="uppercase" placeholder="uf" v-model="rgUF" />
      <select v-model="sexo" v-if="isUpdade">
        <option>Feminino</option>
        <option>Masculino</option>
      </select>

      <select v-model="sexo" v-else>
        <option value="feminino">Feminino</option>
        <option value="masculino">Masculino</option>
      </select>
    
      <input type="text" placeholder="estado civil" v-model="estadoCivil" />
      <input
        type="text"
        placeholder="cep"
        v-model="cep"
        @change="seachAddress(cep)"
      />
      <input type="text" placeholder="logradouro" v-model="rua" />
      <input type="text" placeholder="numero" v-model="numero" />
      <input type="text" placeholder="complemento" v-model="complemento" />
      <input type="text" placeholder="bairro" v-model="bairro" />
      <input type="text" placeholder="cidade" v-model="cidade" />
      <input type="text" class="uppercase" placeholder="uf" v-model="uf" />
      <div class="button-container">
        <button @click="openModal">Cancelar</button>
        <button @click="postClient" v-if="!isUpdade" :disabled="!isCPF(this.cpf) || !isData(this.dataNasc)">Adicionar</button>
        <button @click="sendUpdate" v-else :disabled="!isCPF(this.cpf) || !isData(this.dataNasc)">Atualizar</button>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from "pinia";
  import { useClientStore } from "../stores/clientData";
  import { formatDate, convertDate, cpfIsValid, dateIsValid } from "../helpers";

  export default {
    name: "Modal",
    computed: {
      ...mapState(useClientStore, {
        toUpdate: "clientToUpdate",
        isUpdade: "isEdit",
      }),
    },
    data() {
      return {
        clientId: "",
        enderecoId: "",
        nome: "",
        dataNasc: "",
        cpf: "",
        rg: "",
        dataExp: "",
        orgaoExp: "",
        rgUF: "",
        sexo: "feminino",
        estadoCivil: "",
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
      };
    },
    methods: {
      ...mapActions(useClientStore, [
        "addClient",
        "putUpdate",
        "getAddress",
        "openModal",
        "removeClient",
      ]),
      isCPF(e){
       return cpfIsValid(e)
      },
      isData(e){
       return dateIsValid(e)
      },
      async seachAddress(cep) {
        this.getAddress(cep);
        let endereco = await this.getAddress(cep);
        (this.rua = endereco.logradouro),
          (this.bairro = endereco.bairro),
          (this.cidade = endereco.localidade),
          (this.uf = endereco.uf);
      },
      async postClient() {
        const data = {
          cpf: this.cpf.replace(/\D/g, ""),
          nome: this.nome.toLowerCase(),
          rg: this.rg.replace(/\D/g, ""),
          dataExpedicao: formatDate(this.dataExp),
          orgaoExpedicao: this.orgaoExp,
          uf: this.rgUF,
          dataNascimento: formatDate(this.dataNasc),
          sexo: this.sexo,
          estadoCivil: this.estadoCivil,
          endereco: {
            cep: this.cep.replace(/\D/g, ""),
            logradouro: this.rua,
            numero: this.numero,
            complemento: this.complemento,
            bairro: this.bairro,
            cidade: this.cidade,
            uf: this.uf,
          },
        };
        try {
          await this.addClient(data);
        } catch (error) {
          console.log(error);
        }
      },
      fillInput() {
        if (this.isUpdade == true) {
          this.clientId = this.toUpdate.clienteId;
          (this.enderecoId = this.toUpdate.endereco.enderecoId),
            (this.nome = this.toUpdate.nome),
            (this.dataNasc = convertDate(this.toUpdate.dataNascimento)),
            (this.cpf = this.toUpdate.cpf),
            (this.rg = this.toUpdate.rg),
            (this.dataExp = convertDate(this.toUpdate.dataExpedicao)),
            (this.orgaoExp = this.toUpdate.orgaoExpedicao),
            (this.rgUF = this.toUpdate.uf),
            (this.sexo = this.toUpdate.sexo),
            (this.estadoCivil = this.toUpdate.estadoCivil),
            (this.cep = this.toUpdate.endereco.cep),
            (this.rua = this.toUpdate.endereco.logradouro),
            (this.numero = this.toUpdate.endereco.numero),
            (this.complemento = this.toUpdate.endereco.complemento),
            (this.bairro = this.toUpdate.endereco.bairro),
            (this.cidade = this.toUpdate.endereco.cidade),
            (this.uf = this.toUpdate.endereco.uf);
        }
      },
      async sendUpdate() {
        const data = {
          clienteId: this.clientId,
          cpf: this.cpf.replace(/\D/g, ""),
          nome: this.nome.toLowerCase(),
          rg: this.rg.replace(/\D/g, ""),
          dataExpedicao: formatDate(this.dataExp),
          orgaoExpedicao: this.orgaoExp,
          uf: this.rgUF,
          dataNascimento: formatDate(this.dataNasc),
          sexo: this.sexo,
          estadoCivil: this.estadoCivil,
          endereco: {
            enderecoId: this.enderecoId,
            cep: this.cep.replace(/\D/g, ""),
            logradouro: this.rua,
            numero: this.numero,
            complemento: this.complemento,
            bairro: this.bairro,
            cidade: this.cidade,
            uf: this.uf,
          },
        };
        try {
          await this.putUpdate(data);
        } catch (error) {
          console.log(error);
        }
      },
    },
    watch: {
      async cep(value) {
        if (!this.isUpdade && value.length == 8) {
          this.getAddress(value);
          let endereco = await this.getAddress(value);
          (this.rua = endereco.logradouro),
            (this.bairro = endereco.bairro),
            (this.cidade = endereco.localidade),
            (this.uf = endereco.uf);
        }
      },
    },
    mounted() {
      this.fillInput();
    },
  };
</script>
<style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background: #7c7c7ca1;
    height: 100vh;
    width: 100vw;
    z-index: 10;
  }

  .form-container {
    background: #fff;
    width: 85vw;
    min-height: 60vh;
    padding: 30px;
  }
  input {
    border: 0.5px solid gray;
    margin: 3px;
    text-transform: capitalize;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .button-container{
    display: flex;
  }

  button {
    height: 30px;
    margin-top: 5px;
    margin-inline: 15px;
  }

  button:first-child{
    border: 1px solid var(--destaque);
    background: #fff;
  }

  button:nth-child(2){
    background: var(--primaria);
    color: #fff;
  }

  button:nth-child(2):disabled{
    background: #d694a8;
  }


</style>

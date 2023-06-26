<template>
  <table>
    <thead v-if="data.length > 0">
      <th class="first-line">#</th>
      <th>CPF</th>
      <th>Nome</th>
      <th>Data Nasc</th>
      <th>Sexo</th>
      <th>RG</th>
      <th>Data Exp.</th>
      <th>Orgão Exp.</th>
      <th>UF</th>
      <th>Estado Civil</th>
      
      <th>CEP</th>
      <th>Logradouro</th>
      <th>Numero</th>
      <th>Complemento</th>
      <th>Bairro</th>
      <th>Cidade</th>
      <th>UF</th>
    </thead>
    <tbody >
      <tr v-for="client in data" :key="client.clienteId" v-if="data.length > 0">
        <tr class="dado first-line">
          <td class="update"> 
            <button @click="editar(client.clienteId)"></button> 
            <button @click="apagar(client.clienteId)"></button>
          </td>
        </tr>
        <tr class="dado"><td>{{ client.cpf }}</td></tr>
        <tr class="dado"><td>{{ client.nome }}</td></tr>
        <tr class="dado"><td>{{ dataConvert(client.dataNascimento) }}</td></tr>
        <tr class="dado"><td>{{ client.sexo }}</td></tr>
        <tr class="dado"><td>{{ client.rg }}</td></tr>
        <tr class="dado"><td>{{ dataConvert(client.dataExpedicao) }}</td></tr>
        <tr class="dado"><td class="uppercase">{{ client.orgaoExpedicao }}</td></tr>
        <tr class="dado"><td class="uppercase">{{ client.uf }}</td></tr>
        <tr class="dado"><td>{{ client.estadoCivil }}</td></tr>
        <tr class="dado"><td>{{ client.endereco.cep }}</td></tr>
        <tr class="dado"><td>{{ client.endereco.logradouro }}</td></tr>
        <tr class="dado"><td>{{ client.endereco.numero }}</td></tr>
        <tr class="dado"><td>{{ client.endereco.complemento }}</td></tr>
        <tr class="dado"><td>{{ client.endereco.bairro }}</td></tr>
        <tr class="dado"><td >{{ client.endereco.cidade }}</td></tr>
        <tr class="dado"><td class="last-element uppercase">{{ client.endereco.uf }}</td></tr>
    </tr>
    <div v-else class="no-results"><h2>Sem dados</h2><img class="icon-not-found" src="../../assets/no-results.png"></div>
    </tbody>
  </table>
</template>
<script>
import { convertDate } from '../../helpers';
import { useClientStore } from '../../stores/clientData';
import {mapState, mapActions} from 'pinia'

  export default {
    name: "DataTable",
    props: {
      data: Array,
    },
    computed:{
      ...mapState(useClientStore,{
        filtering: 'typing',
        filterData: 'clientDataFilter'
      })
    },
    methods:{
      ...mapActions(useClientStore, ['getUpdateClient','removeClient']),
      dataConvert(date){
       return convertDate(date)
      },
      editar(id){
        this.getUpdateClient(id)
      },
      apagar(id){
        this.removeClient(id)
      }
    }
  };
</script>
<style scoped>

.no-results{
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  font-size: 1.5rem;
}
.icon-not-found{
  margin-left: 10px;
  width: 12%;
}
    table {
        display: flex;
        width: 90vw;
        margin-block:20px 40px;
        scroll-snap-type: mandatory;
        border: .6px var(--primaria) solid;
        box-sizing: border-box;
        border-spacing: 0;
    }

    tbody::-webkit-scrollbar{
        height: 10px;
    }

    tbody::-webkit-scrollbar-track {
        background: var(--secundaria);
        border-radius: 10px;
    }
 
    tbody::-webkit-scrollbar-thumb {
        background-color: var(--primaria);
        border-radius: 12px;
    }
    
      thead{
        display: flex;
        flex-direction: column;
      }

    tbody {
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        border-collapse: collapse;
        display: flex;
        padding-bottom: 10px ;
    }
  th {
    width: 30vw;
    line-height: 30px;
    height: 30px;
    border-bottom: 1px solid var(--primaria);
    border-right: .8px solid;
    font-size: 12px;
  }

  th:last-child{
    border-bottom: none;
  }

  th:nth-child(odd){
    background: rgb(243, 194, 194);
  }
  
  .dado:nth-child(odd), .dado-add:nth-child(even){
    background: #dfdfdf;
  }

  .dado{
    display: flex;
    height: 30px;
    line-height: 30px;
    text-transform: capitalize !important;
  }

  .first-line{
  height: 50px !important;
  line-height: 50px;
  }

  .update{
    display: flex ;
    justify-content: center ;
    align-items: center;
  }

  .update button{
    height: 80%;
    width: min(30%,45px);
 
  }
  .update button:first-child{
   margin-right: 5%;
   background: url('../../assets/edit.png') center no-repeat;
   background-size: 60%;
  }
  .update button:nth-child(2){
   margin-right: 5%;
   background: url('../../assets/delete.png') center no-repeat;
   background-size: 56%;
  }
  
   .uppercase{
    text-transform: uppercase;
  }

  td {
   
    font-size: 12px;
    min-width: 58vw !important;
    padding-left: 2vw;
    scroll-snap-align: start;
    border-right: 1px solid var(--secundaria);
    border-bottom: 1px solid #dfdfdf;  
}

button{
  width: max-content;
  font-size: 1rem;
  height: max-content;
}

.last-element{
    border-bottom: 0 !important;
}

  @media screen and (min-width:768px) {
    th{
        font-size: 1.1em;
    }
    td{
        min-width: 30vw !important;
        font-size: 1rem;
    }


    
  }
  @media screen and (min-width:1024px) {
    th {
        width: 20vw;
        font-size: 1.3em;
    }
    td{
        width: 30vw !important;
    }
    
  }
</style>

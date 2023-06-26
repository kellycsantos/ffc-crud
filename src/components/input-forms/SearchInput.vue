<template>
  <div class="searchContainer">
    <select class="select" v-model="searchOption">
      <option value="nome">Nome</option>
      <option value="cpf">CPF</option>
    </select>
    <input
    class="search"
    type="text"
    v-model="searchValue"
    :placeholder="
        searchType == 'nome' ? 'Digite o nome...' : 'Digite o CPF...'
      "
    />
    <button @click="openModal">+</button>
  </div>
</template>
<script>
  import { mapState, mapActions } from "pinia";
  import { useClientStore } from "../../stores/clientData";
  export default {
    name: "SearchInput",
    data() {
      return {
        searchType: "nome",
        searchOption: "nome",
        searchValue: "",
      };
    },
    methods: {
      ...mapActions(useClientStore, ["dataFilter", "openModal"]),
      filtrando(value) {
        this.dataFilter(this.searchType, value);
      },
    },
    watch: {
      searchOption(option) {
        this.searchType = option;
      },
      searchValue(e) {
        let value = e.toLowerCase()
        this.filtrando(value);
      },
    },
    mounted() {},
  };
</script>
<style scoped>
  button {
    height: 100%;
    width: 60px;
    background: var(--primaria);
    color: #fff;
  }
  .searchContainer {
    display: flex;
    margin-top: 25px;
    height: 40px;
  }

  .search {
    border: 1px solid lightslategray;
    flex-grow: 1;
  }

  select {
    background: var(--primaria);
    color: #fff;
  }

  @media screen and (min-width: 768px) {
    select {
      min-width: 200px;
    }
  }
</style>

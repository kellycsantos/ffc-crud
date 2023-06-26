<template>
  <div class="about">
    <Navbar />
    <div>
      <CrudModal v-if="isOpen"/>
      <SearchInput ref="searchBar" @change="istyping()"/>
      <Table :data="filtering ? filtered : clients"/>
    </div>
    <Footer />
  </div>
</template>
<script>
  import Navbar from "../components/Navbar.vue";
  import SearchInput from "../components/input-forms/SearchInput.vue";
  import Table from "../components/table/Table.vue";
  import CrudModal from "../components/CrudModal.vue";
  import Footer from "../components/Footer.vue";

  import { mapState, mapActions } from "pinia";
  import { useClientStore } from "../stores/clientData";
  export default {
    name: "LoggedArea",
    components: {
      Navbar,
      SearchInput,
      Table,
      CrudModal,
      Footer,
    },
    computed: {
      ...mapState(useClientStore, {
        clients: "clientData",
        filtered: 'clientDataFilter',
        isOpen: 'modalAddClient',
        filtering: 'typing'
      }),
    },
    methods: {
      ...mapActions(useClientStore, ["getClients","typingSearch"]),
      istyping(){
        this.typingSearch(this.$refs.searchBar.searchValue)
      }
    },
    mounted() {
      this.getClients();
    }
  };
</script>

<style style>
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
</style>

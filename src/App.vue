<template>
  <div>
  <RouterView />
  </div>
</template>

<script>
  import { RouterLink, RouterView } from "vue-router";
  import { mapState } from "pinia";
  import { useUserStore } from "./stores/user";

  export default {
    computed: {
      ...mapState(useUserStore, {
        isLogged: "isLogged",
      }),
    },

    mounted() {},
  };
</script>


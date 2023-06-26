<template>
  <footer>
    <span class="title-footer">
      <h2>FFC</h2>
      <p>portal</p>
    </span>

    <p class="direitos"> Copyright &copy {{year}} FFC</p>
  </footer>
</template>
<script>
  export default {
    name: "Footer",
    props: {
      name: String,
      email: String,
      username: String,
    },
    data(){
      return{
        year: new Date().getFullYear()
      }
    }
  };
</script>

<style>
  footer {
    background: var(--primaria);
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-inline: 30px;
    font-size: 1rem;
    text-transform: capitalize;
    color: #fff;
  }

  .title-footer{
    display: flex;
    align-items: baseline;
  }

  .direitos{
    font-size: .7rem;
  }

  @media screen and (min-width: 768px) {
    nav {
      font-size: 1.9rem;
      padding-inline: 60px;
    }
    .direitos{
    font-size: 1rem;
  }
  }
</style>

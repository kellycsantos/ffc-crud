<template>
  <header>
    <nav v-for="user in infoUser">
      <span class="user-name" @click="toggleMenu">{{ user.name ? user.name : 'Admin' }}</span>
      <ul :style="`display: ${menuOpen ? 'block': 'none'}`"  ref="menu">
        <span class="profile-data">
          <li class="name">{{ user.name ? user.name : "Daya Riveira" }}</li>
          <li class="email">{{ user.email ? user.email : "daya.riveira@gml.co" }}</li>
          <li class="username">{{ user.username ? user.username : "@daya_123" }}</li>
        </span>
        <span @click="closeMenu" class="navbar-options">
          <li><a href="#">Perfil</a></li>
          <li><a href="#">Configurações</a></li>
          <li><a href="#">Suporte</a></li>
          <li @click="logout">Sair</li>
        </span>
      </ul>
    </nav>
  </header>
</template>
<script>
import { mapState,mapActions } from 'pinia';
import { useUserStore } from '../stores/user';
  export default {
    name: "Navbar",
    props: {
      name: String,
      email: String,
      username: String,
    },
    computed:{
      ...mapState(useUserStore, {
        infoUser :'userInfo'
      })

    },
    data() {
      return {
        menuOpen: false,
      };
    },
    methods: {
      ...mapActions(useUserStore, ['userLogout']),
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
      closeMenu() {
        this.menuOpen = false;
      },
      handleClickOutside(event) {
        if (this.$refs.menu &&
          !event.target.classList.contains("user-name")) {
          this.closeMenu();
        }
      },
      logout(){
        this.$router.push('/') 
        this.userLogout()
      },
    },
    mounted() {
      document.addEventListener("click", this.handleClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener("click", this.handleClickOutside);
    },
  };
</script>

<style scoped>
a{
  display: flex !important;
}
  nav {
    background: var(--primaria);
    width: 100vw;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    justify-content: center;
    padding-inline: 30px;
    font-size: 1.3rem;
    text-transform: capitalize;
  }

  .user-name {
    color: var(--branco, #fff);
    border-bottom: 1px solid floralwhite;
    padding-bottom: 1px;
    font-weight: 600;
    cursor: pointer;
  }

  ul {
    display: block;
    position: absolute;
    top: 60px;
    color: #000000;
    width: 260px;
    padding: 19px 0;
    background: #ffffff;
    box-shadow: -3px 5px 8px 2px #0c0c0c71;
  }

  .profile-data {
    display: inline-block;
    margin-bottom: 25px;
    padding-inline: 18px;
  }

  .name {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .email,
  .username {
    font-size: 14px;
    font-weight: 400;
    text-transform: lowercase;
  }
  .email {
    color: var(--primaria);
  }

  .navbar-options li {
    cursor: pointer;
    margin-bottom: 11px;
    padding: 5px 18px;
  }

  .navbar-options li:hover {
    margin-bottom: 11px;
    background: var(--primaria);
    color: #fff;
  }

  a {
    all: unset;
  }

  @media screen and (min-width: 768px) {
    nav {
      font-size: 1.9rem;
      padding-inline: 60px;
    }
  }
</style>

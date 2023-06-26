import { defineStore } from "pinia";
import axios from "axios";

import { filter } from "../helpers/index";

const baseAPi = "https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente";
export const useClientStore = defineStore("client", {
  state: () => {
    return {
      clientData: [],
      clientDataFilter: [],
      typing: false,
      modalAddClient: false,
      isEdit: false,
      clientToUpdate: [],
    };
  },
  actions: {
    async getClients() {
      try {
        const response = await axios.get(`${baseAPi}/listar`);
        this.clientData = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    dataFilter(type, value) {
      this.clientDataFilter = filter(this.clientData, type, value);
    },

    typingSearch(value) {
      value.length > 0 ? (this.typing = true) : (this.typing = false);
    },

    openModal() {
      this.isEdit = false;
      this.modalAddClient = !this.modalAddClient;
    },

    async addClient(data) {
      try {
        await axios.post(`${baseAPi}/adicionar`, data);
        setTimeout(() => {
          this.getClients();
          this.modalAddClient = false;
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
    async getUpdateClient(id) {
      this.isEdit = true;
      try {
        const response = await axios.get(`${baseAPi}/listarPorId/${id}`);
        this.modalAddClient = true;
        this.clientToUpdate = response.data;
        this.isEdit = true;
      } catch (error) {
        console.log(error);
      }
    },

    async putUpdate(data) {
      try {
        await axios.put(`${baseAPi}/alterar`, data);

        setTimeout(() => {
          this.getClients();
          this.modalAddClient = false;
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },

    async removeClient(id) {
      try {
        await axios.delete(`${baseAPi}/excluir/${id}`);
        this.getClients();
      } catch (error) {
        console.log(error);
      }
    },

    async getAddress(cep) {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data;
    },
  },
});

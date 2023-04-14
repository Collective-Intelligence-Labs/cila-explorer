<template>
    <div class="container">
      <h2 class="title">NFTs</h2>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hash</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="document in documents" :key="document.id" @click="navigateToDetails(document.id)" class="document-row">
            <td class="cell-limit">{{ document.id }}</td>
            <td class="cell-limit">{{ document.hash }}</td>
            <td class="cell-limit">{{ document.owner }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'NFTDocuments',
    data() {
      return {
        documents: []
      };
    },
    created() {
      this.fetchDocuments();
    },
    methods: {
      async fetchDocuments() {
        try {
          const response = await axios.get('/nft');
          this.documents = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      navigateToDetails(id) {
        this.$router.push(`/nft/${id}`);
      }
    }
  };
  </script>

<style scoped>
.cell-limit {
  max-width: 300px; /* adjust the value to your needs */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<template>
    <div class="container">
      <h2 class="title">NFT Details</h2>
      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">ID:</label>
                <div class="control">
                  <input class="input" type="text" :value="nftDocument.id" readonly>
                </div>
              </div>
              <div class="field">
                <label class="label">Hash:</label>
                <div class="control">
                  <input class="input" type="text" :value="nftDocument.hash" readonly>
                </div>
              </div>
              <div class="field">
                <label class="label">Owner:</label>
                <div class="control">
                  <input class="input" type="text" :value="nftDocument.owner" readonly>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'NFTDocumentDetails',
    data() {
      return {
        nftDocument: null,
        loading: false
      }
    },
    methods: {
      async loadNFTDocumentDetails() {
        this.loading = true
        try {
          const response = await axios.get(`/nft/${this.$route.params.id}`)
          this.nftDocument = response.data
        } catch (error) {
          console.error(error)
        } finally {
          this.loading = false
        }
      }
    },
    mounted() {
      this.loadNFTDocumentDetails()
    }
  }
  </script>
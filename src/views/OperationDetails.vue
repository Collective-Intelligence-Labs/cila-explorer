
<template>
    <div class="container" v-if="operation">
      <h2 class="title">Operation Details</h2>
      <p><strong>ID:</strong> {{ operation.id }}</p>
      <p><strong>Created:</strong> {{ formatDate(operation.created) }}</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li v-for="command in operation.commands" :key="command">{{ command }}</li>
      </ul>
      <div class="columns">
        <div class="column">
        <h3 class="column-title">Routers</h3>
        <ul class="sync-items-list">
          <li v-for="router in operation.routers" :key="router.id" class="sync-item">
            <p class="sync-item-name">{{ router.name }}</p>
            <p class="sync-item-id">ID: {{ router.id }}</p>
            <p class="sync-item-timestamp">Timestamp: {{ formatDate(router.timestamp) }}</p>
            <p class="sync-item-source">{{ router.originalSource ? 'Original Source' : '' }}</p>
            <p class="sync-item-error" v-if="router.errorMessage">{{ router.errorMessage }}</p>
          </li>
        </ul>
      </div>

      <div class="column">
        <h3 class="column-title">Chains</h3>
        <ul class="sync-items-list">
          <li v-for="chain in operation.chains" :key="chain.id" class="sync-item">
            <p class="sync-item-name">{{ toReadableChain(chain.id) }}</p>
            <p class="sync-item-id">ID: {{ chain.id }}</p>
            <p class="sync-item-timestamp">Timestamp: {{ formatDate(chain.timestamp) }}</p>
            <p class="sync-item-source">{{ chain.originalSource ? 'Original Source' : '' }}</p>
            <p class="sync-item-error" v-if="chain.errorMessage">{{ chain.errorMessage }}</p>
          </li>
        </ul>
      </div>

      <div class="column">
        <h3 class="column-title">Relays</h3>
        <ul class="sync-items-list">
          <li v-for="relay in operation.relays" :key="relay.id" class="sync-item">
            <p class="sync-item-name">{{ relay.name }}</p>
            <p class="sync-item-id">ID: {{ relay.id }}</p>
            <p class="sync-item-timestamp">Timestamp: {{ formatDate(relay.timestamp) }}</p>
            <p class="sync-item-source">{{ relay.originalSource ? 'Original Source' : '' }}</p>
            <p class="sync-item-error" v-if="relay.errorMessage">{{ relay.errorMessage }}</p>
          </li>
        </ul>
      </div>

      <div class="column">
        <h3 class="column-title">Aggregators</h3>
        <ul class="sync-items-list">
          <li v-for="aggregator in operation.aggregators" :key="aggregator.id" class="sync-item">
            <p class="sync-item-name">{{ aggregator.name }}</p>
            <p class="sync-item-id">ID: {{ aggregator.id }}</p>
            <p class="sync-item-timestamp">Timestamp: {{ formatDate(aggregator.timestamp) }}</p>
            <p class="sync-item-source">{{ aggregator.originalSource ? 'Original Source' : '' }}</p>
            <p class="sync-item-error" v-if="aggregator.errorMessage">{{ aggregator.errorMessage }}</p>
          </li>
        </ul>
      </div>
    </div>
      <p><strong>Events:</strong></p>
      <ul>
        <li v-for="event in operation.infrastructureEvents" :key="event.eventId" class="event-item">
          <DomainEvent v-bind:event="event"/>
        </li>
      </ul>
    </div>
  </template>

<script>
import axios from 'axios';
import DomainEvent from '../components/Event.vue'

export default {
  name: 'OperationDetails',
  components: {
    DomainEvent
  },
  data() {
    return {
      operation: null,
      loading: false
    }
  },
  methods: {
    async loadOperationDetails() {
      this.loading = true
      try {
        const response = await axios.get(`/operations/${this.$route.params.id}`)
        this.operation = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    toEventTypeDescription(eventType) {
      if (eventType == 0) return "Unspecified";
      if (eventType == 1) return "Operation initiated";
      if (eventType == 2) return "Chain sync";
      if (eventType == 3) return "Read model updated";
      if (eventType == 4) return "Executed on chain";
      if (eventType == 5) return "Routed for execution";
    },
    toReadableChain(chainId) {
        if (chainId == 5) return "Ethereum Goerli";
        if (chainId == 11155111) return "Ethereum Sepolia";
        if (chainId == 1313161555) return "Aurora Testnet";
    },
  },
  mounted() {
    this.loadOperationDetails()
    setInterval(this.loadOperationDetails, 5000) 
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.operation-details {
  margin-top: 2rem;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

li {
  margin-bottom: 0.5rem;
}

.details-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
}

.details-container h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.details-container p {
  margin-bottom: 0.5rem;
}

.details-container ul {
  margin-left: 1rem;
}

.details-container li {
  margin-bottom: 0.25rem;
}

.back-button {
  font-size: 1rem;
  padding: 0.5rem;
  background-color: #0074d9;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #005ea8;
}


.columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.column {
  flex: 1 1 23%;
  margin-right: 2%;
  padding: 0 10px;
}

.column:last-child {
  margin-right: 0;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0.5rem;
  transition: transform 0.3s ease;
}

.column:hover {
  transform: translateY(-5px);
}

.column h3 {
  margin-bottom: 1rem;
}

.column ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.column li {
  margin-bottom: 0.5rem;
}

.column li:before {
  content: "-";
  color: #0074d9;
  margin-right: 0.5rem;
}

.column li a {
  color: #0074d9;
  text-decoration: none;
  transition: color 0.3s ease;
}

.column li a:hover {
  color: #005ea2;
}


.sync-items-list {
  margin-top: 10px;
  padding: 0;
  list-style: none;
}

.sync-item {
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.sync-item:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.sync-item-name {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.sync-item-id,
.sync-item-timestamp,
.sync-item-source {
  margin: 5px 0;
  font-size: 14px;
}

.sync-item-source {
  color: #777;
}

.sync-item-error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.sync-item-error {
  font-size: 0.8rem;
  color: #f44336;
  margin-top: 0.5rem;
  border: 1px solid #f44336;
  border-radius: 4px;
  padding: 0.5rem;
  background-color: #ffebee;
}

.sync-items-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sync-item {
  position: relative;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.sync-item:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  z-index: -1;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.sync-item:hover:before {
  transform: scale(1.05);
}

.sync-item:last-child {
  margin-bottom: 0;
}

.sync-item-name {
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 5px;
  color: #333;
}

.sync-item-id,
.sync-item-timestamp,
.sync-item-source,
.sync-item-error {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.sync-item-error {
  color: #f44336;
  font-weight: 500;
  margin-top: 5px;
}

</style>

<template>
    <div class="container" v-if="operation">
      <h2 class="title">Operation Details</h2>
      <p><strong>ID:</strong> {{ operation.id }}</p>
      <p><strong>Client ID:</strong> {{ operation.clientId }}</p>
      <p><strong>Created:</strong> {{ formatDate(operation.created) }}</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li v-for="command in operation.commands" :key="command">{{ command }}</li>
      </ul>
      <p><strong>Infrastructure Events:</strong></p>
      <ul>
        <li
          v-for="event in operation.infrastructureEvents"
          :key="event.eventId"
          class="event-item"
        >
          <div class="event-header">
            <p class="event-timestamp">{{ formatDate(event.timestamp) }}</p>
            <p class="event-type">{{ event.type }}</p>
          </div>
          <div class="event-details">
            <p><strong>Portal ID:</strong> {{ event.portalId }}</p>
            <p><strong>Event ID:</strong> {{ event.eventId }}</p>
            <p><strong>Router ID:</strong> {{ event.routerId }}</p>
            <p><strong>Relay ID:</strong> {{ event.relayId }}</p>
            <p><strong>Core ID:</strong> {{ event.coreId }}</p>
            <p><strong>Aggregator ID:</strong> {{ event.aggregatorId }}</p>
            <p><strong>Operation ID:</strong> {{ event.operationId }}</p>
            <p><strong>Domain Events:</strong></p>
            <ul>
              <li v-for="domainEvent in event.domainEvents" :key="domainEvent">{{ domainEvent }}</li>
            </ul>
            <p><strong>Domain Commands:</strong></p>
            <ul>
              <li v-for="domainCommand in event.domainCommands" :key="domainCommand">{{ domainCommand }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </template>

<script>
import axios from 'axios'

export default {
  name: 'OperationDetails',
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
    }
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
</style>
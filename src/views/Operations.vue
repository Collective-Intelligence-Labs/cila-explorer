<template>
  <div class="container">
    <h2 class="title">Operations</h2>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Client ID</th>
          <th>Created</th>
          <th>Commands</th>
          <th>Infrastructure Events</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="operation in operations" :key="operation.id" @click="navigateToDetails(operation.id)" class="operation-row">
          <td>{{ operation.id }}</td>
          <td>{{ operation.clientId }}</td>
          <td>{{ formatDate(operation.created) }}</td>
          <td>{{ operation.commands.join(", ") }}</td>
          <td>{{ operation.infrastructureEvents.length }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OperationsTable",
  data() {
    return {
      operations: [],
      selectedOperation: null
    };
  },
  created() {
    axios.get("Operations").then(response => {
      this.operations = response.data;
    });

     // continuously load new data
     setInterval(() => {
      axios.get("Operations").then(response => {
        this.operations = response.data;
      });
    }, 5000); // request new data every 5 seconds
  },
  methods: {
    navigateToDetails(id) { 
      console.log(id);
      this.$router.push(`/operations/` + id)
    },
    showDetails(operation) {
      this.selectedOperation = operation;
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    }
  }
};
</script>
<style>
  .container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.title {
  font-size: 2.5rem;
  color: #4050b5;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 1px 1px #dcdcdc;
}

.table {
  font-size: 1.2rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.operation-row:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

.operation-details {
  margin-top: 20px;
}

.subtitle {
  font-size: 2rem;
  color: #4050b5;
  margin-bottom: 20px;
  text-shadow: 1px 1px #dcdcdc;
}

.event-item {
  margin-top: 20px;
  background-color: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.event-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #dcdcdc;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.event-timestamp {
  font-size: 1rem;
  color: #4050b5;
  text-shadow: 1px 1px #dcdcdc;
}

.event-type {
  font-size: 1rem;
  color: #fff;
  background-color: #4050b5;
  padding: 5px 10px;
  border-radius: 5px;
  text-transform: uppercase;
}

.event-details {
  padding: 10px;
}

.event-details p {
  margin: 5px 0;
}

.event-details strong {
  color: #4050b5;
}
/* Add animation for operation row */
.operation-row {
  position: relative;
  animation-name: row-bounce;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
}


/* Add animation for event item */
.event-item {
  position: relative;
  animation-name: item-slide;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-iteration-count: 1;
}

@keyframes item-slide {
  0% {
    opacity: 0;
    transform: translateX(-50%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}


</style>
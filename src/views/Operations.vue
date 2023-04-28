<template>
  <div class="container">
    <h2 class="title">Operations</h2>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Created</th>
          <th>Commands</th>
          <th>Events</th>
          <th>
            Status
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <tbody>
                <tr>
                  <th v-for="s in operations[0].perChainStatus" :key="s.chainId">{{ s.chainName }}</th>
                </tr>
              </tbody>
            </table>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="operation in operations" :key="operation.id" @click="navigateToDetails(operation.id)" class="operation-row">
          <td>{{ operation.id }}</td>
          <td>{{ formatDate(operation.created) }}</td>
          <td>{{ operation.commands.length }}</td>
          <td>{{ operation.infrastructureEvents.length }}</td>
          <td>
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <tbody>
                <tr>
                  <td v-for="s in operation.perChainStatus" :key="s.chainId">
                    <div v-html="getChainStatusIcon(s.status)"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
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
    },
    getChainStatusIcon(status) {
      if (status == "0") return '<i class="fa-solid fa-check" style="color: #23d100;"></i>';
      if (status == "1") return '<i class="fa-solid fa-spinner"></i>';
      if (status == "2") return '<i class="fa-solid fa-xmark" style="color: #c20505;"></i>';
      return "Unknown";
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

.table .is-fullwidth {
  width: 100%;
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
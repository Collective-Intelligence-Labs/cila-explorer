<template>
  <div class="event-header">
    <p class="event-type">{{ toEventTypeDescription(event.type) }}</p>
    <p class="event-timestamp">{{ formatDate(event.timestamp) }}</p>
  </div>
  <div class="event-details">
    <p><strong>Event ID:</strong> {{ event.eventId }}</p>
    <p v-if="event.routerId"><strong>Router ID:</strong> {{ event.routerId }}</p>
    <p v-if="event.relayId"><strong>Relay ID:</strong> {{ event.relayId }}</p>
    <p v-if="event.chainId"><strong>Chain:</strong> {{ toReadableChain(event.chainId) }}</p>
    <p v-if="event.coreId"><strong>Tx hash:</strong> <a :href="getTxExplorerLink(event.coreId, event.chainId)">{{ event.coreId }}</a> </p>
    <p v-if="event.aggregatorId"><strong>Aggregator ID:</strong> {{ event.aggregatorId }}</p>
    <p v-if="event.domainEvents.length > 0"><strong>Domain Events:</strong> {{ event.domainEvents.length }}</p>
    <ul v-if="event.domainEvents.length > 0">
      <li v-for="domainEvent in event.domainEvents" :key="domainEvent">
        {{ domainEvent }}
      </li>
    </ul>
    <p v-if="event.domainCommands.length > 0"><strong>Domain Commands:</strong> {{ event.domainCommands.length }}</p>
    <ul v-if="event.domainCommands.length > 0">
      <li v-for="domainCommand in event.domainCommands" :key="domainCommand">
        {{ domainCommand }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DomainEvent",
  props: [ "event" ],
  methods: {
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
    getTxExplorerLink(tx, chainId) {
        if (tx) {
            if (chainId == 5) return "https://goerli.etherscan.io/tx/" + tx;
            if (chainId == 11155111) return "https://sepolia.etherscan.io/tx/" + tx;
            if (chainId == 1313161555) return"https://explorer.testnet.aurora.dev/tx/" + tx;
        }
    }
  },
};
</script>
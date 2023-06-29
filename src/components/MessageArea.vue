<template>
  <div id="message-area" class="message-area">
    <div v-for="msg in messages" :key="msg.date">
      <MessageBox :messageObj="msg" />
    </div>
  </div>
</template>

<script setup>
import MessageBox from '../components/MessageBox.vue';
import { inject, onUpdated } from 'vue';

const messages = inject('messages');

function scrollToEnd() {
  var container = document.querySelector('#message-area');
  container.scrollTop = container.scrollHeight;
}

onUpdated(() => {
  scrollToEnd();
});
</script>
<style>
.message-area {
  overflow-y: auto;
}
</style>

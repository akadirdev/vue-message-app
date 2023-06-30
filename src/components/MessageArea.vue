<template>
  <div id="message-area" class="message-area">
    <div v-for="msg in messages" :key="msg.date">
      <MessageBox :messageObj="msg" @deleteMessage="deleteMessage" />
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

function deleteMessage(msg) {
  const msgIndex = messages.value.findIndex(
    (f) =>
      f.message === msg.message && f.date.toString() === msg.date.toString()
  );
  messages.value.splice(msgIndex, 1);
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

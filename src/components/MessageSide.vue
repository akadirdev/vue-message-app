<template>
  <div class="message-side">
    <MessageArea class="message-area" />
    <TextingBox class="texting-box" @new-message="addMessage" />
  </div>
</template>

<script setup>
import MessageArea from '../components/MessageArea.vue';
import TextingBox from '../components/TextingBox.vue';
import { ref, provide, inject } from 'vue';
import { socket } from '@/main';

const store = inject('store');
const messages = ref([]);

provide('messages', messages);

function addMessage(message) {
  const msgObj = {
    text: message,
    user: store.state.username,
    date: new Date(),
  };
  messages.value.push(msgObj);
  socket.emit('new-message', msgObj);
}
</script>
<style scoped>
.message-side {
}
.message-area {
  height: 90%;
}
.texting-box {
  height: 10%;
}
</style>

<template>
  <div class="texting-box">
    <a-textarea
      class="text-area"
      v-model:value="userMessage"
      placeholder="Type message.."
      :rows="1"
      @keyup.enter="sendMessage"
    />
    <a-button class="send-btn" type="primary" @click="sendMessage"
      >Gönder</a-button
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userMessage = ref('');
const emit = defineEmits(['newMessage']);

function sendMessage() {
  userMessage.value = userMessage.value.trim();
  if (userMessage.value !== '') {
    emit('newMessage', userMessage.value);
    userMessage.value = '';
  }
}
</script>

<style scoped>
.texting-box {
  display: flex;
}
.text-area {
  margin: 20px;
  margin-right: 0px;
  flex: 9;
  font-size: medium;
  resize: none;
}
.send-btn {
  margin: 20px;
  flex: 1;
}
</style>

<template>
  <div class="message-side">
    <MessageArea class="message-area" />
    <TextingBox class="texting-box" @new-message="addMessage" />
  </div>
</template>

<script setup>
import axios from 'axios';
import MessageArea from '../components/MessageArea.vue';
import TextingBox from '../components/TextingBox.vue';
import { inject, watch } from 'vue';
import { socket } from '@/main';
import { serverUrl } from '@/config';
import { notification, message } from 'ant-design-vue';

const store = inject('store');
const messages = inject('messages');
const props = defineProps(['friendId']);

function addMessage(mewMessage) {
  console.log('add message', mewMessage);
  const msgObj = {
    message: mewMessage,
    senderUserId: store.state.user.id,
    date: new Date(),
    receiverUserId: props.friendId,
  };

  socket.emit('new-message', msgObj);
  console.log('emitted new-message', msgObj);
}

watch(
  () => {
    return { ...props };
  },
  async (newValue, oldValue) => {
    if (newValue.friendId && newValue.friendId !== oldValue.friendId) {
      // get all messages
      console.log('get all messages');
      await axios
        .get(
          `${serverUrl}/messages/${store.state.user.id}/with/${newValue.friendId}`
        )
        .then((response) => {
          messages.value = response.data;
          message.success(`${newValue.friendId} arkadaş mesajlar çekildi.`);
        })
        .catch((error) => {
          errorNofication(error.response.data);
        });
    }
    if (!newValue.friendId && !newValue.friendId != !oldValue.friendId) {
      // get all messages
      console.log('remove messages');
      messages.value = [];
    }
    console.log('watch friendId', newValue, oldValue);
  }
);

const errorNofication = (error) => {
  notification['error']({
    message: 'Sohbet Yükleme Hatası',
    description: error.message,
  });
};

// export interface IMessage {
//   id?: string;
//   message: string;
//   senderUserId: string;
//   date: Date;
// }

// export interface IMessageObject extends IMessage {
//   receiverUserId: string;
// }
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

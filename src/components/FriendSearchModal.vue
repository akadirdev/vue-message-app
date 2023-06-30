<template>
  <a-modal
    v-model:visible="visible"
    title="Yeni Arkadaş Ekle"
    @cancel="handleCancel"
  >
    <div style="width: 100%; height: 200px">
      <a-input
        v-model:value.trim="inputUsername"
        placeholder="Bulmak istediğiniz kullanıcı adı"
        style="margin: 5% 10%; width: 80%"
        @keyup.enter="handleAddFriend"
      />
      <a-button
        type="primary"
        @click="handleAddFriend"
        style="margin: 2% 30%; width: 40%"
        >Arkadaş Ara ve Ekle</a-button
      >
    </div>
    <template #footer>
      <a-button @click="handleCancel">İptal</a-button>
    </template>
  </a-modal>
</template>

<script setup>
import axios from 'axios';
import { ref, inject } from 'vue';
import { serverUrl } from '@/config';
import { notification, message } from 'ant-design-vue';

const emit = defineEmits(['closedSearchModal']);
const visible = inject('visible');
const store = inject('store');

const inputUsername = ref('');

async function handleAddFriend() {
  const isSucceed = await axios
    .post(
      `${serverUrl}/users/friends/new`,
      {},
      {
        params: {
          username: store.state.user.username,
          friend: inputUsername.value,
        },
      }
    )
    .then((response) => {
      store.state.user.friends.push(response.data);
      message.success(`${inputUsername.value} arkadaş olarak eklendi.`);
      inputUsername.value = '';
      return true;
    })
    .catch((error) => {
      loginErrorNofication(error.response.data);
      return false;
    });

  emit('closedSearchModal', {
    successed: isSucceed,
    visiblityOfModal: true,
  });
}

function handleCancel() {
  inputUsername.value = '';
  emit('closedSearchModal', {
    successed: false,
    visiblityOfModal: false,
  });
}

const loginErrorNofication = (error) => {
  notification['error']({
    message: 'Arkadaş eklerken bir hata oluştu..',
    description: error.message,
  });
};
</script>

<style scoped></style>

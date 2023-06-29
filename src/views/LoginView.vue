<template>
  <div
    style="width: 100%; height: 100vh; display: flex; justify-content: center"
  >
    <div class="login">
      <a-typography-title class="login-title" :level="2"
        >DedeApp</a-typography-title
      >
      <a-input
        class="username-input"
        v-model:value="store.state.username"
        placeholder="Kullanıcı Adı.."
      >
        <template #prefix>
          <user-outlined type="user" />
        </template>
        <template #suffix>
          <a-tooltip
            title="Uygulama içinde kullanacağınız kullanıcı adınızı belirleyin.."
          >
            <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
          </a-tooltip>
        </template>
      </a-input>
      <a-button class="login-btn" type="primary" @click="login">Giriş</a-button>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';

const store = inject('store');
const router = useRouter();

function login() {
  if (store.state.username !== '') router.push('/');
}
</script>

<style>
.login {
  width: 20%;
  height: 50%;
  margin-top: 8%;
  border: 1px solid green;
  border-radius: 20px;
  text-align: center;
}
.login-title {
  text-align: center;
  margin-top: 20%;
}
.username-input {
  width: 80%;
  margin: 20% 10% 7% 10%;
}
.login-btn {
}
</style>

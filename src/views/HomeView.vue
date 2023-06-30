<template>
  <FriendSearchModal @closedSearchModal="handleClosedModel" />
  <a-layout style="height: 100vh">
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px; height: 100%">
      <a-layout
        style="
          padding: 24px 0;
          background: #fff;
          height: 100%;
          width: 80%;
          margin: auto;
        "
      >
        <a-layout-sider width="250" style="background: #fff; height: 100%">
          <a-menu
            v-model:selectedKeys="selectedKeys"
            v-model:openKeys="openKeys"
            mode="inline"
            style="height: 100%; padding-left: 0px"
          >
            <a-sub-menu key="friends-menu">
              <template #title>
                <span>
                  <book-outlined />
                  Tüm Kişiler
                </span>
              </template>
              <a-menu-item v-for="friend in user.friends" :key="friend.id"
                ><span>
                  <user-outlined />
                  {{ friend.username }}
                </span></a-menu-item
              >
              <a-menu-item style="margin-left: 0px"
                ><span>
                  <plus-outlined />
                  Arkadaş Ekle
                </span></a-menu-item
              >
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content style="padding: 0 24px; height: 100%">
          <MessageSide style="height: 100%" />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Abdulkadir Dede ©2023 Developed with {{ '<3' }}
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { inject, onBeforeMount, ref, watch, provide } from 'vue';
import {
  UserOutlined,
  BookOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import MessageSide from '../components/MessageSide.vue';
import FriendSearchModal from '@/components/FriendSearchModal.vue';

const router = useRouter();
const store = inject('store');
const user = store.state.user;

const selectedKeys = ref(['']);
const openKeys = ref(['friends-menu']);
const visible = ref(false);

onBeforeMount(() => {
  if (!user.id) {
    router.push('/login');
  }
});

const showModal = () => {
  visible.value = true;
};

function handleClosedModel({ successed, visiblityOfModal }) {
  visible.value = visiblityOfModal;

  if (successed) {
    selectedKeys.value = [user.friends[user.friends.length - 1].id];
  } else {
    selectedKeys.value = [''];
  }
}

watch(selectedKeys, (newValue) => {
  console.log('selectedKeys', newValue);
  if (newValue[0] === null) showModal();
});

provide('visible', visible);
</script>

<style>
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>

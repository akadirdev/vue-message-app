<template>
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
        <a-layout-sider width="200" style="background: #fff; height: 100%">
          <a-menu
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            mode="inline"
            style="height: 100%; padding-left: 25px"
          >
            <a-sub-menu key="sub1">
              <template #title>
                <span>
                  <user-outlined />
                  Tüm Kişiler
                </span>
              </template>
              <a-menu-item key="1">Kişi 1</a-menu-item>
              <a-menu-item key="2">Kişi 2</a-menu-item>
              <a-menu-item key="3">Kişi 3</a-menu-item>
              <a-menu-item key="4">Kişi 4</a-menu-item>
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
import { inject, onBeforeMount, ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import MessageSide from '../components/MessageSide.vue';

const router = useRouter();
const store = inject('store');

const selectedKeys2 = ref(['1']);
const openKeys = ref(['sub1']);

onBeforeMount(() => {
  if (store.state.username === '') {
    router.push('/login');
  }
});
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

<template>
  <!-- <nav>
    <router-link to="/">Home</router-link>
  </nav> -->
  <router-view />
</template>

<script setup>
import { provide } from 'vue';
import store from '@/store';

provide('store', store);
</script>

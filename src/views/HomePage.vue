<template>
<VApp>
  <Navbar></Navbar>
  <VMain>
    <router-view></router-view>
  </VMain>
  
</VApp>

</template>

<script setup>
import Navbar from '@/layouts/Navbar.vue'

</script>

<style scoped>

</style>
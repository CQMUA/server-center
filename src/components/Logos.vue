<template>

</template>

<style scoped>
.logo-link {
  position: relative;
  display: inline-block;
}

.tooltip {

  visibility: hidden;
  width: 120px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  border-radius: 8px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: -20%;
  left: 50%;
  margin-left: -65px;
  opacity: 0;
  transition: opacity 0.3s;
  backdrop-filter: blur(5px);
}

.logo-link:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.logo-link img {
  opacity: 0.8;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 3em #6AC8FE);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 3em #EA4D64);
}

.logo.element-plus:hover {
  filter: drop-shadow(0 0 3em #55C97B);
}
</style>
<script setup lang="ts">
</script>
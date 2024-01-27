<template>
  <router-view />
  <CustomCursor />
</template>

<script lang="ts" setup>
import CustomCursor from "@/components/CustomCursor.vue";
import { useContentStore } from "@/store/content";
import { onBeforeMount, onMounted } from "vue";

onBeforeMount(() => {
  document.fonts.ready.then(() => {
    useContentStore().setFontLoaded();
  });
});
</script>

<style lang="scss"></style>

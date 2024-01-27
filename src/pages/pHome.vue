<template>
  <WelcomeText v-if="!isMobile()" />
  <div v-if="!isMobile()" id="content-container" class="content__container">
    <LayoutNavbar />
    <div class="content__wrapper">
      <component
        :is="navbarItem.view"
        v-for="(navbarItem, index) in navbarItems"
        :key="index"
      />
    </div>
  </div>
  <div v-if="isMobile()" class="mobile__placeholder">
    <p v-glitched="`Mobile version coming soon`" />
  </div>
</template>

<script lang="ts" setup>
import WelcomeText from "@/components/content/WelcomeText.vue";
import CustomCursor from "@/components/CustomCursor.vue";
import LayoutNavbar from "@/components/Layout/Navbar.vue";
import { useContentStore } from "@/store/content";
import { useScrollerStore } from "@/store/scroller";
import { onBeforeMount, onMounted } from "vue";

const { navbarItems, activateByHash, isMobile } = useContentStore();
const { createListeners } = useScrollerStore();

onMounted(() => {
  createListeners();
  activateByHash(true, false);
});
</script>

<style lang="scss">
.content__container {
  width: 100%;
  height: calc(100vh - 4vmin);
  background: $white;
  z-index: 1;

  .content__wrapper {
    width: 100%;
    background-color: $white;
    scroll-snap-align: start;
    height: 100%;
    margin-top: -3vmin;

    .content__page:first-child {
      .content__page--upper {
        background: unset !important;
      }
    }
  }
}

.mobile__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  align-content: center;
  width: 100%;

  p {
    white-space: normal;
    height: fit-content;
    max-height: unset;
    max-width: calc(100vw - 130px);
    overflow-wrap: break-word;
    font-size: 9vw;

    line-height: unset !important;
    height: fit-content !important;
  }
}
</style>

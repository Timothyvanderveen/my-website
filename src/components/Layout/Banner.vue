<template>
  <div class="layout__banner">
    <a
      :href="bannerItem.creditSrc"
      class="layout__banner--credit"
      target="_blank"
    >
      {{ bannerItem.creditName }}
    </a>
    {{ currentPath }}
    <transition name="fade" mode="in-out">
      <img
        :key="activeItemId"
        class="layout__banner--image"
        :alt="bannerItem.alt"
        :src="bannerItem.src"
        :style="bannerItem.style"
      />
    </transition>
    <div class="layout__banner--gradient" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface BannerItem {
  url: string;
  src: string;
  alt: string;
  creditName: string;
  creditSrc: string;
  style: string | null;
}

export default defineComponent({
  name: "LayoutBanner",
  data: () => ({
    currentPath: location.pathname,
    activeItemId: 0,
  }),
  watch: {
    $route(to) {
      window.scrollTo(0, 0);
      this.currentPath = to.path;
    },
  },
  computed: {
    bannerItem() {
      const bannerItems = [
        {
          url: "/",
          src: "https://images.unsplash.com/photo-1631602152241-f3f4c76c4958?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3154&q=80",
          alt: "home",
          creditName: "Ričards Zvagulis",
          creditSrc: "https://unsplash.com/@richards36",
          style: null,
        },
        {
          url: "/who-am-i",
          src: "https://images.pexels.com/photos/248280/pexels-photo-248280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          alt: "whoami",
          creditName: "Pixabay",
          creditSrc: "https://www.pexels.com/@pixabay/",
          style: "top: -70px;",
        },
      ] as BannerItem[];

      return (
        bannerItems.find((f, index) => {
          if (f.url === this.currentPath) {
            this.activeItemId = index;
            return true;
          }

          return false;
        }) ?? bannerItems[0]
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.layout__banner {
  height: $banner-size;
  overflow: hidden;
  inset: 0;

  .layout__banner--gradient {
    @include fillWH;
    background-size: cover;
    color: white;
  }

  .layout__banner--image {
    width: 100%;
    position: fixed;
    inset: 0;
    filter: grayscale(60%);
    translate: 0 -15%;
  }

  .layout__banner--credit {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    font-size: 10px;
    color: rgb(0 0 0 / 30%);
    margin: 1em;
  }
}
</style>

<style></style>

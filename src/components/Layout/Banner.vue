<template>
  <div class="layout__banner">
    <a target="_blank" :href="bannerItem.creditSrc">
      <GlitchedText
        class="layout__banner--credit clickable"
        :text="bannerItem.creditName"
        :hover="true"
      />
    </a>

    <transition name="fade" mode="in-out">
      <img
        :key="activeItemId"
        class="layout__banner--image"
        :alt="bannerItem.alt"
        :src="bannerItem.src"
        :style="bannerItem.style"
      />
    </transition>

    <GlitchedText
      text="timothy"
      class="layout__banner--firstname"
      :hover="true"
    />
    <GlitchedText
      text="van der veen"
      class="layout__banner--surname"
      id="layout__banner--surname"
      :hover="true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GlitchedText from "@/components/GlitchedText.vue";

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
  components: { GlitchedText },
  data: () => ({
    currentPath: location.pathname,
    activeItemId: 0,
  }),
  watch: {
    $route(to) {
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
  inset: 0;
  position: relative;

  .layout__banner--gradient {
    @include fillWH;
    background-size: cover;
    color: white;
  }

  .layout__banner--image {
    width: 100%;
    position: fixed;
    object-fit: cover;
    inset: 0;
    height: 50vh;
    filter: grayscale(60%);
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
    opacity: 0.3;
    color: rgb(0 0 0%);
    padding: 1em;
    transition: all 0.3s;
    transform-origin: top right;

    &:hover {
      opacity: 1;
      scale: 1.3;
    }
  }
}
.layout__banner--firstname,
.layout__banner--surname {
  line-height: 33px;
  height: 38px;
  font-size: 50px;
  max-height: unset;
  overflow: hidden;
}

.layout__banner--firstname {
  position: fixed;
  color: #f5f5f5;
  translate: 0 calc(-100% + 1px);
  top: $banner-size;
  right: -3px;
  bottom: -1px;
}
.layout__banner--surname {
  bottom: 1px;
  position: absolute;
  color: black;
  translate: 0 100%;
  z-index: 100;
  right: 0;
  width: 440.5px;
}
</style>

<style></style>

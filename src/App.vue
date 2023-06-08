<template>
  <KeepAlive>
    <LayoutBanner ref="banner" />
  </KeepAlive>

  <!-- <div
    style="
      border: 4px solid black;
      top: 50%;
      left: 0;
      right: 0;
      position: fixed;
      z-index: 10000;
      translate: 0 -50%;
    "
  /> -->

  <div class="content" ref="content">
    <div class="content__bar left" ref="contentBarLeft">
      <LayoutNavbar />
    </div>

    <KeepAlive>
      <transition name="fade" mode="out-in">
        <div class="content__view" ref="contentView" :key="currentPath">
          <router-view />
        </div>
      </transition>
    </KeepAlive>

    <div class="content__bar right" ref="contentBarRight" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LayoutBanner from "@/components/Layout/Banner.vue";
import LayoutNavbar from "@/components/Layout/Navbar.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    LayoutBanner,
    LayoutNavbar,
  },
  data: () => ({
    currentPath: location.pathname,
  }),
  watch: {
    $route(to) {
      window.scrollTo(0, 0);
      this.currentPath = to.path;
    },
  },
  beforeUpdate() {
    this.setContentBars();
  },
  mounted() {
    document.onscroll = () => this.setContentBars();
  },
  methods: {
    setContentBars() {
      const contentBars = [
        this.$refs["contentBarLeft"],
        this.$refs["contentBarRight"],
      ] as HTMLElement[];

      contentBars.forEach((contentBar: HTMLElement) => {
        const bannerHeight = 400;
        const { scrollY } = window;
        const newHeightOffset = bannerHeight - scrollY;
        if (newHeightOffset >= 0) {
          contentBar.style.height = `calc(100vh - ${newHeightOffset}px)`;
        }
      });
    },
  },
});
</script>

<style lang="scss">
.content {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: $white;
  min-height: calc(100vh + 400px);
}

.content__bar {
  width: $content-bar-width;
  position: absolute;
  position: fixed;
  height: calc(100vh - $banner-size);
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }
}

.content__view {
  margin: 10vh 20% 0 30%;
  width: 100%;
  font-family: PoiretOne;
  font-weight: 600;
  text-align: right;
}
</style>

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
    <div class="content__bar" ref="contentBarLeft">
      <KeepAlive>
        <LayoutNavbar />
      </KeepAlive>
    </div>
    <div class="content__view" ref="contentView">
      <router-view />
    </div>
    <div class="content__bar" ref="contentBarRight" />
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
  methods: {},
  mounted() {
    // TODO destructure into functions
    // TODO run once on mounted to initiate
    document.onscroll = (e) => {
      const contentBars = [
        this.$refs["contentBarLeft"],
        // this.$refs["contentBarRight"],
      ] as HTMLDivElement[];

      contentBars.forEach((contentBar: HTMLDivElement) => {
        const boundingRect = contentBar.getBoundingClientRect();
        const elementHeight = contentBar.offsetHeight;
        const centerOfElement = boundingRect.top + elementHeight / 2; // half size of element + pixels from top
        const centerOfScreen = window.innerHeight / 2; // total pixels of screen divided in half
        const isPositionFixed = contentBar.style.position === "fixed";

        if (centerOfElement <= centerOfScreen && !isPositionFixed) {
          contentBar.style.position = "fixed";
          contentBar.style.top =
            centerOfScreen - contentBar.offsetHeight / 2 + "px";
        }

        if (boundingRect.top + window.scrollY <= 450 && isPositionFixed) {
          contentBar.style.position = "absolute";
          contentBar.style.top = "50px";
        }
      });
    };
  },
});
</script>

<style lang="scss">
@import "./assets/css/_global.scss";

.content {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: $white;
  padding: 50px 0 0;
}

.content__bar {
  width: $content-bar-width;
  height: fit-content;
  position: absolute;
  top: 50px;
}

.content__view {
  margin: 0 $content-bar-width;
  width: 100%;
}
</style>

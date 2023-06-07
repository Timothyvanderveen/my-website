<template>
  <div class="layout__banner">
    <a
      href="https://unsplash.com/photos/splf2zjnnX0"
      class="layout__banner--credit"
    >
      Ričards Zvagulis
    </a>
    <img
      v-if="isPath('/')"
      class="layout__banner--image"
      alt="Home"
      src="@/assets/img/main-banner-ricards-zvagulis--unsplash.jpg"
    />
    <img
      v-if="isPath('/resume')"
      class="layout__banner--image"
      alt="Home"
      src="@/assets/img/resume-banner.jpg"
    />
    <div class="layout__banner--gradient" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutBanner",

  // TODO placeholder
  methods: {
    isPath(pathname: string) {
      return location.pathname === pathname;
    },
  },
});
</script>

<style lang="scss" scoped>
.layout__banner {
  height: $banner-size;
  overflow: hidden;
  // position: fixed;
  inset: 0;
  // margin-top: 400px;
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

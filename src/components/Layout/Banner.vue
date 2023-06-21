<template>
  <div class="layout__banner">
    <a target="_blank" href="https://unsplash.com/@richards36">
      <GlitchedText
        class="layout__banner--credit clickable"
        text="Ričards Zvagulis"
      />
    </a>

    <div class="layout__banner--image" />

    <GlitchedText
      text="timothy"
      class="layout__banner--firstname"
      :hover="true"
    />
    <GlitchedText
      ref="surname"
      text="van der veen"
      class="layout__banner--surname"
      id="layout__banner--surname"
      :hover="true"
    />

    <div class="layout__banner--border" />
  </div>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent } from "vue";
import GlitchedText from "@/components/GlitchedText.vue";

export default defineComponent({
  name: "LayoutBanner",
  components: { GlitchedText },
  methods: {
    setNamePosition() {
      const surname = (this.$refs["surname"] as ComponentPublicInstance)
        .$el as HTMLElement;

      const bannerHeight = innerHeight / 2;
      if (scrollY >= bannerHeight) {
        surname.style.top = "0";
        surname.style.position = "fixed";
      } else {
        surname.style.top = "";
        surname.style.position = "absolute";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.layout__banner {
  height: 100vh;
  inset: 0;
  position: relative;

  .layout__banner--gradient {
    @include fillWH;
    background-size: cover;
    color: white;
  }

  .layout__banner--image {
    width: 100%;
    position: absolute;
    object-fit: cover;
    inset: 0;
    height: 50vh;
    filter: grayscale(60%);
    background-image: url("https://images.unsplash.com/photo-1631602152241-f3f4c76c4958?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3154&q=80");
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
  position: fixed;
  color: black;
  top: 50vh;
  z-index: 100;
  right: 0;
  height: 38px;
  background-color: $white;
  line-height: 31px;
  width: 100%;
  text-align: right;
}
.layout__banner--border {
  background-color: $white;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 50vh;
}
</style>

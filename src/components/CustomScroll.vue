<template>
  <div id="custom-scroll" ref="customScroll" />
</template>

<script lang="ts">
import { useScrollerStore } from "@/store/scroller";
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";

// TODO

export default defineComponent({
  name: "CustomCursor",
  data: () => ({
    cursor: Object.create(HTMLElement.prototype, {}) as HTMLElement,
  }),
  computed: {
    ...mapState(useScrollerStore, { isScrolling: "isScrolling" }),
    ...mapActions(useScrollerStore, ["createListeners"]),
  },
  watch: {
    isScrolling(value: boolean) {
      if (value) {
        document.documentElement.classList.add("scrolling");
      } else {
        document.documentElement.classList.remove("scrolling");
      }
    },
  },
  mounted() {
    return this.createListeners;
  },
});
</script>

<style scoped lang="scss">
// #custom-scroll {
//   z-index: 1000;
//   transition: width 0.2s ease-in-out;
//   // translate: 0 20vh;
//   background: black;
//   position: absolute;
//   height: 100vh;
//   width: 8px;
//   top: 50vh;
// }
</style>

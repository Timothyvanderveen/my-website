<template>
  <GlitchedText text="timothy" class="test1" :hover="true" />
  <GlitchedText text="van der veen" class="test2" :hover="true" />
</template>

<script lang="ts">
import GlitchedText from "@/components/GlitchedText.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  data: () => ({ text: "" }),
  components: { GlitchedText },
});
</script>

<style lang="scss" scoped>
.test1 {
  top: 418px;
  position: fixed;
  right: 0;
  translate: 0 -100%;
  color: #f5f5f5;
  font-size: 209px;
  max-height: unset;
}
.test2 {
  max-height: unset;
  top: 377px;
  position: fixed;
  right: 7px;
  color: black;
  z-index: 1000;
  right: 0;
  font-size: 120px;
}
</style>

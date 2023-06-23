<template>
  <div class="content__page" v-if="!full">
    <div class="content__page--upper">
      <slot name="upper" />
    </div>

    <div class="hr-wrapper" :class="{ wide: wideHr }"><hr /></div>
    <div class="content__page--lower">
      <slot name="lower" />
    </div>
  </div>
  <div class="content__page" v-if="full">
    <div class="content__page--full">
      <slot name="full" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentPage",
  data: () => ({}),
  props: {
    full: {
      type: Boolean,
      required: false,
      default: false,
    },
    wideHr: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {},
  methods: {},
});
</script>

<style scoped lang="scss">
.content__page {
  height: $viewHeight;
  scroll-snap-align: start;
  overflow: hidden;

  .hr-wrapper {
    background: $white;
    padding-left: 380px;
    z-index: 1;
    position: relative;

    &.wide {
      padding: 0;
    }

    hr {
      margin: 0;
      background: black;
      height: 2px;
      border: 0;
    }
  }

  .content__page--upper,
  .content__page--lower {
    height: 50%;
    position: relative;
    margin-left: auto;
    background-color: $white;
    padding-left: 50%;
  }

  .content__page--full {
    height: 100%;
    position: relative;
    margin-left: auto;
    background-color: $white;
    padding-left: 50%;
  }

  :deep() {
    .content__page--lower {
      p,
      a {
        text-align: right;
        font-size: 2.5vw;
      }

      > * {
        float: right;
      }
    }

    .content__page--upper__header,
    .content__page--lower__header {
      position: absolute;
      right: 0;
    }

    .content__page--upper__header {
      bottom: 0;
    }

    .content__page--lower__header {
      top: 0;
    }
  }
}
</style>

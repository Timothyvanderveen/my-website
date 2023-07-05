<template>
  <div v-if="!full" class="content__page">
    <div class="content__page--upper">
      <slot name="upper" />
    </div>

    <div class="hr-wrapper" :class="{ wide: wideHr }"><hr /></div>
    <div class="content__page--lower">
      <slot name="lower" />
    </div>
  </div>
  <div v-else class="content__page">
    <div class="content__page--full">
      <slot name="full" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
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
    padding-left: 30%;
  }
}
</style>

<template>
  <ContentPage :wide-hr="true" class="content-page__home">
    <template #upper>
      <p
        id="firstname"
        v-glitched="'timothy'"
        class="content__page--upper__header primary-font"
      />
    </template>

    <template #lower>
      <p
        id="surname"
        ref="surname"
        v-glitched="'van der Veen'"
        class="content__page--lower__header primary-font"
      />
    </template>
  </ContentPage>
</template>

<script lang="ts" setup>
import ContentPage from "../ContentPage.vue";
import { useScrollerStore } from "@/store/scroller";
import { onMounted, ref } from "vue";
import { useContentStore } from "@/store/content";
import { ComponentPublicInstance } from "vue";

interface HomePageStyleObject {
  top: string;
  position: string;
  right: string;
}

const scrollerStore = useScrollerStore();
const contentStore = useContentStore();

const surname = ref<HTMLElement | null>(null);

onMounted(() => {
  scrollerStore.addScrollAction(() => {
    const app = document.getElementById("app") as HTMLElement;

    const style = {
      top: "0",
      position: "absolute",
      right: "0",
    } as HomePageStyleObject;

    const innerPadding = contentStore.vmin(3);
    const outerBorder = contentStore.vmin(5);

    if (app.scrollTop >= innerHeight / 2 - outerBorder) {
      style.top = `calc(50vh - ${app.scrollTop}px + 0.3vmin)`;
      style.position = `fixed`;
      style.right = innerPadding + outerBorder + "px";
    }

    if (app.scrollTop >= innerHeight / 2 - contentStore.vmin(0.3)) {
      style.top = "0.7vmin";
      style.position = `fixed`;
      style.right = innerPadding + outerBorder + "px";
    }

    (Object.keys(style) as Array<keyof typeof style>).forEach((key) => {
      if (!surname.value) return;
      surname.value.style[key] = style[key];
    });
  });
});
</script>

<style scoped lang="scss">
.content-page__home {
  #firstname {
    z-index: 0;
    position: fixed;
    right: calc($outsideBorder + $insidePadding);
    top: 46.31vh;
  }
  #surname {
    right: 0;
    z-index: 5;
    position: absolute;
    translate: 0 1px;
  }
}
</style>

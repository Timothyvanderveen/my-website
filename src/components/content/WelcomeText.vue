<template>
  <div class="welcome-text__wrapper">
    <GlitchedText :text="text" class="welcome-text" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useContentStore } from "@/store/content";
import GlitchedText from "../GlitchedText.vue";

onMounted(() => {
  updateText();
});

const contentStore = useContentStore();

const text = ref("welcome");

const texts = {
  welcome: [
    "welcome", // English
    "bienvenido", // Spanish
    "willkommen", // German
    "bem-vindo", // Portuguese
    "benvenuto", // Italian
    "bienvenue", // French
    "välkommen", // Swedish
    "velkommen", // Norwegian
    "witaj", // Polish
  ],
  interactions: [
    "how are you?",
    "nice to meet you",
    ":)",
    "<3",
    "stay awhile",
    "made with love",
  ],
};

let textType = 0;
let intervalMs = 2000;
let timeoutId = 0;

const updateText = () => {
  intervalMs = 4000;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    text.value = useContentStore().fontLoaded ? text.value : "Incorrect font";

    let textArray = [] as string[];

    intervalMs = Math.random() * (10000 - 4000) + 4000;

    if (Math.random() > 0.45 || textType === 1) {
      textType = 0;
      textArray = texts.welcome;
    } else {
      textType = 1;
      textArray = texts.interactions;
    }

    const index = Math.round(Math.random() * (textArray.length - 1));
    const newText = textArray[index];
    text.value = newText;
    updateText();
  }, intervalMs);
};

watch(contentStore.getActive, async (to) => {
  if (to.id === 1) {
    text.value = "back again?";
    updateText();
  }
});
</script>

<style lang="scss" scoped>
.welcome-text__wrapper {
  position: fixed;
  overflow: hidden;
  inset: 0;
  top: $outsideBorder;
  z-index: 0;
  height: calc(50vh - 5vmin);
  width: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;

  .welcome-text {
    opacity: 0.15;
    font-size: 8vmin !important;
    max-height: 8vmin !important;
    overflow: visible !important;
  }
}
</style>

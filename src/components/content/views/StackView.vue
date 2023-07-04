<template>
  <ContentPage :full="true" class="content-page__stack">
    <template #full>
      <div class="stack-list padded-height">
        <div v-for="(stack, index) in stackArray" :key="index" class="stack">
          <GlitchedText :text="stack" />
        </div>
      </div>
    </template>

    <template #lower />
  </ContentPage>
</template>

<script lang="ts" setup>
import GlitchedText from "@/components/GlitchedText.vue";
import ContentPage from "../ContentPage.vue";

const stackArray = [
  "JavaScript",
  "TypeScript",
  "Vue",
  "Nuxt",
  "CSS",
  "SASS",
  "NPM/YARN",
  "Axios",
  "JQuery",
  "HTML",
  "PHP",
  "Yii2",
  "Bootstrap",
  "ESlint",
  "Prettier",
  "Postman",
  "JSON",
  "MySql/MariaDB",
  "WSL2",
  "Bash",
  "Github",
];
</script>

<style lang="scss" scoped>
.content-page__stack {
  .stack-list {
    display: flex;
    flex-direction: column;
    right: 0;
    position: absolute;
    // gap: 1vh;
    justify-content: center;

    * {
      text-align: right;
    }

    .stack * {
      font-size: 2.8vh !important;
      max-height: 2.8vh;
    }
  }
}
</style>

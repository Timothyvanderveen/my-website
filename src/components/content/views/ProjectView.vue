<template>
  <ContentPage :full="true" class="content-page__project">
    <template #full>
      <div class="project-list padded-height">
        <div v-for="(project, index) in projects" :key="index" class="project">
          <a
            v-glitched="
              projectHover === index
                ? `${project.projectText}>`
                : project.projectText
            "
            class="primary-font"
            target="_blank"
            :href="`//${project.projectHref}`"
            @mouseenter="projectHover = index"
            @mouseleave="projectHover = -1"
          />

          <a
            v-glitched="
              projectCompany === index ? `${project.company}>` : project.company
            "
            class="project-company"
            target="_blank"
            :href="`//${project.companyHref}`"
            @mouseenter="projectCompany = index"
            @mouseleave="projectCompany = -1"
          />
        </div>
      </div>
    </template>
  </ContentPage>
</template>

<script lang="ts" setup>
import GlitchedText from "@/components/GlitchedText.vue";
import ContentPage from "../ContentPage.vue";
import { ref } from "vue";

const projectHover = ref(-1);
const projectCompany = ref(-1);
const projects = [
  {
    projectText: "spell-it",
    projectHref: "spellit.nl",
    company: "nio communicatie & internet",
    companyHref: "niocommunicatie.nl",
  },
  {
    projectText: "schoolkr8",
    projectHref: "schoolkr8.nl",
    company: "nio communicatie & internet",
    companyHref: "niocommunicatie.nl",
  },
];
</script>

<style lang="scss" scoped>
.content-page__project {
  .project-list {
    display: flex;
    flex-direction: column;
    right: 0;
    position: absolute;
    gap: 10vh;
    // gap: 1vh;
    justify-content: center;

    * {
      text-align: right;
      display: block;
    }
    .project-company {
      max-height: 2vw;
      * {
        display: block;
        font-size: 1.5vw !important;
        max-height: 1.5vw;
      }
    }
  }
}
</style>

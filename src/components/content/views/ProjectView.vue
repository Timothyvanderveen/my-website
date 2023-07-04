<template>
  <ContentPage :full="true" class="content-page__project">
    <template #full>
      <div class="project-list padded-height">
        <div v-for="(project, index) in projects" :key="index" class="project">
          <GlitchedText
            :text="
              projectHover === index
                ? `${project.projectText}>`
                : project.projectText
            "
            @mouseenter="projectHover = index"
            @mouseleave="projectHover = -1"
          >
            <template #default="slotProps">
              <a target="_blank" :href="`//${project.projectHref}`">
                {{ slotProps.text }}
              </a>
            </template>
          </GlitchedText>

          <GlitchedText
            :text="
              projectCompany === index ? `${project.company}>` : project.company
            "
            class="project-company"
            @mouseenter="projectCompany = index"
            @mouseleave="projectCompany = -1"
          >
            <template #default="slotProps">
              <a target="_blank" :href="`//${project.companyHref}`">
                {{ slotProps.text }}
              </a>
            </template>
          </GlitchedText>
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

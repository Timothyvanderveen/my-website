<template>
  <ContentPage :full="true" class="content-page__social">
    <template #full>
      <div class="social-list padded-height">
        <div v-for="(social, index) in socials" :key="index" class="social">
          <GlitchedText
            :text="socialHover === index ? `${social.text}>` : social.text"
            @mouseenter="socialHover = index"
            @mouseleave="socialHover = -1"
          >
            <template #default="slotProps">
              <a
                :target="social.href !== '' ? '_blank' : ''"
                :href="`//${social.href}`"
              >
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

const socialHover = ref(-1);
const socials = [
  {
    text: "github",
    href: "github.com/Timothyvanderveen",
  },
  {
    text: "linkedin",
    href: "linkedin.com/in/timothyvanderveen/",
  },
  {
    text: "instagram",
    href: "instagram.com/t.vdveen_/",
  },
];
</script>

<style lang="scss" scoped>
.content-page__social {
  .social-list {
    display: flex;
    flex-direction: column;
    right: 0;
    position: absolute;
    // gap: 1vh;
    justify-content: center;
    gap: 2vmin;

    * {
      text-align: right;
    }
  }
}
</style>

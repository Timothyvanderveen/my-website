<template>
  <ContentPage :full="true" class="content-page__about-me">
    <template #full>
      <div class="about-me__wrapper">
        <p class="about-me">
          <span
            v-for="(spanText, index) in getSpanArray()"
            :key="index"
            class="secondary-font"
          >
            {{ spanText }}
          </span>
        </p>
      </div>
    </template>
  </ContentPage>
</template>

<script lang="ts" setup>
import ContentPage from "../ContentPage.vue";

const getBirthYear = () => {
  let birthdateTimeStamp = new Date(1997, 5, 25);
  let diff = new Date().getTime() - birthdateTimeStamp.getTime();
  let currentAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  // Divide by 1000*60*60*24*365.25

  return currentAge;
};

const getSpanArray = () => {
  return [
    "Hello there_",
    "I am Timothy van der Veen",
    `a ${getBirthYear()} year old`,
    "fullstack developer",
    "from Groningen_",
    "In the captivating",
    "realm of web development",
    "variables speak",
    "louder than words_",
    "Instead of writing a resume",
    "full of half-truths",
    "and exaggerated claims",
    "I prefer to let",
    "my skills do the talking_",
  ];
};
</script>

<style lang="scss" scoped>
.content-page__about-me {
  .about-me__wrapper {
    height: calc(100% - 20px);
    width: 100%;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .about-me {
      text-align: left;
      text-transform: lowercase;

      span {
        margin: 1vmin 0;
        font-family: "MajorMono";
        max-height: unset;
        display: block;
      }
    }
  }
}
</style>

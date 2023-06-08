<template>
  <h1 class="glitched-text__wrapper" @mouseenter="goHover()">
    {{ shownText }}
  </h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GlitchedText",
  data: () => ({
    glitchedCharacters: "`¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?░▒▓<>/".split(""),
    jumbledText: null as null | string,
    jumbled: false as boolean,
    interval: null as null | number,
  }),
  props: {
    text: {
      type: String,
      required: true,
    },
    hover: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    shownText() {
      return this.jumbledText ?? this.text;
    },
  },
  mounted() {
    this.jumble();
    setTimeout(() => {
      // Array.from(Array(Math.ceil(this.text.length / 10))).forEach(() => {
      this.unjumble();
      // });
    }, 200);
  },
  methods: {
    goHover() {
      if (this.hover) {
        this.click();
      }
    },
    click() {
      this.jumble();
      this.unjumble();
    },
    jumble() {
      const unusedIndices = Array.from(this.text.split("").keys());
      this.jumbledText = this.text;

      this.text.split("").forEach((letter, letterIndex) => {
        const newIndex = this.getIndicesIndex(unusedIndices);
        if (!this.jumbledText || this.jumbledText[newIndex] === "") return;

        this.jumbledText = this.replaceText(
          this.jumbledText,
          this.getRandomGlitchedChar(this.jumbledText),
          newIndex
        );
        this.jumbled = true;
      });
    },
    unjumble() {
      const unusedIndices = Array.from(this.text.split("").keys());
      const interval = setInterval(() => {
        if (unusedIndices.length !== 0) {
          if (!this.jumbledText) return;
          const newIndex = this.getIndicesIndex(unusedIndices);
          this.jumbledText = this.replaceText(
            this.jumbledText,
            this.text[newIndex],
            newIndex
          );
        } else {
          if (interval) {
            clearInterval(interval);
            this.jumbled = false;
            return;
          }
        }
      }, 250 / this.text.length);
    },
    replaceText(text: string, newChar: string, index: number) {
      return text.substring(0, index) + newChar + text.substring(index + 1);
    },
    getRandomGlitchedChar(text: string) {
      let randomIndex;
      let glitchedChar;
      // do {
      randomIndex = Math.floor(Math.random() * this.glitchedCharacters.length);
      glitchedChar = this.glitchedCharacters[randomIndex];
      // } while (text.includes(glitchedChar));

      return glitchedChar;
    },
    // Add callback?
    getIndicesIndex(unusedIndices: number[] = []): number {
      const indicesIndex = Math.floor(Math.random() * unusedIndices?.length);
      return unusedIndices.splice(indicesIndex, 1)[0];
    },
  },
});
</script>

<style scoped lang="scss"></style>

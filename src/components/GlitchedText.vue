<template>
  <div class="glitched-text__wrapper" :class="{ glitched: jumbled }">
    {{ jumbledText ?? text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GlitchedText",
  data: () => ({
    glitchedCharacters: "`¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?░▒▓<>/".split(""),
    jumbledText: "" as string,
    jumbled: false as boolean,
    interval: null as null | number,
    isHovering: false,
    textBefore: "",
    deltaTimeout: 0,
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
  mounted() {
    // this.textBefore = this.text;
    this.jumbledText = this.text;
    this.jumble();

    // setTimeout(() => {
    //   this.unjumble();
    // }, 250 / this.text.length);
  },
  watch: {
    text() {
      this.jumble();
    },
  },
  methods: {
    jumble() {
      const unusedIndices = Array.from(this.jumbledText.split("").keys());
      let deltaIndex = this.text.length - this.jumbledText.length;

      if (deltaIndex !== 0) {
        if (deltaIndex < 0) {
          this.jumbledText = this.jumbledText.slice(0, -1);
        }
        if (deltaIndex > 0) {
          this.jumbledText = this.replaceText(
            this.jumbledText,
            this.getRandomGlitchedChar(this.jumbledText),
            this.jumbledText.length + deltaIndex
          );
        }

        clearTimeout(this.deltaTimeout);
        this.deltaTimeout = setTimeout(() => this.jumble(), 20);
        return;
      }

      clearTimeout(this.deltaTimeout);

      this.jumbledText.split("").forEach(() => {
        const newIndex = this.getIndicesIndex(unusedIndices);
        this.jumbledText = this.replaceText(
          this.jumbledText,
          this.getRandomGlitchedChar(this.jumbledText),
          newIndex
        );
      });

      setTimeout(() => {
        this.unjumble();
      }, 200);

      this.jumbled = true;
    },
    unjumble() {
      const unusedIndices = Array.from(this.jumbledText.split("").keys());
      const interval = setInterval(() => {
        if (unusedIndices.length !== 0) {
          const newIndex = this.getIndicesIndex(unusedIndices);
          this.jumbledText = this.replaceText(
            this.jumbledText,
            this.text[newIndex] ?? "",
            newIndex
          );
        } else {
          if (interval) {
            clearInterval(interval);
            setTimeout(() => {
              this.jumbled = false;
            }, 200);
            return;
          }
        }
      }, 250 / this.text.length);
    },
    replaceText(text: string, newChar: string, index: number) {
      return (
        (text.substring(0, index) ?? "") +
        newChar +
        (text.substring(index + 1) ?? "")
      );
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

<style scoped lang="scss">
.glitched-text__wrapper {
  font-family: "MajorMono";
  font-size: 40px;
  white-space: nowrap;
  margin: 0;
  font-weight: 600;
  max-height: 40px;
}
</style>

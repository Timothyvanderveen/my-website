<template>
  <div class="glitched-text__wrapper">
    <slot :text="shownText">{{ shownText }} </slot>
  </div>
</template>

<script lang="ts">
import { useContentStore } from "@/store/content";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GlitchedText",
  data: () => ({
    allowedUpperCase: "AGHMRVWXZaghmrvwxz",
    glitchedCharacters: "`¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?░▒▓<>/".split(""),
    jumbledText: "" as string,
    interval: {
      jumble: -1,
      changeSize: -1,
      unjumble: -1,
    },
  }),
  props: {
    distort: {
      type: Boolean,
      required: false,
      default: true,
    },
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
    this.jumbledText = this.text;
    this.jumble();
  },
  watch: {
    text(before, after) {
      this.jumble();
    },
  },
  computed: {
    shownText() {
      return this.jumbledText ?? this.text;
    },
    intervalTime() {
      const length = this.text?.length ?? this.jumbledText.length; // this.text sometimes null?
      return 100 / length;
    },
  },
  methods: {
    clearAll() {
      Object.keys(this.interval).forEach((key) => {
        const keyString = key as "jumble" | "changeSize" | "unjumble";
        clearInterval(this.interval[keyString]);
        this.interval[keyString] = -1;
      });
    },
    jumble() {
      if (!this.distort) {
        this.jumbledText = this.replaceCase(this.text);
        return;
      }
      this.clearAll();
      const unusedIndices = Array.from(this.jumbledText.split("").keys());
      this.interval.jumble = setInterval(() => {
        if (unusedIndices.length !== 0) {
          const newIndex = this.getIndicesIndex(unusedIndices);
          this.jumbledText = this.replaceText(
            this.jumbledText,
            this.getRandomGlitchedChar(),
            newIndex
          );
        } else {
          this.clearAll();
          this.changeSize();
        }
      }, this.intervalTime);
    },
    changeSize() {
      this.interval.changeSize = setInterval(() => {
        let deltaIndex = this.text.length - this.jumbledText.length ?? 0;
        if (deltaIndex !== 0) {
          if (deltaIndex < 0) {
            const randomIndex = this.getRandomTextIndex(this.jumbledText);
            this.jumbledText =
              this.jumbledText.slice(0, randomIndex) +
              this.jumbledText.slice(randomIndex + 1);
          }

          if (deltaIndex > 0) {
            this.jumbledText = this.appendToText(
              this.jumbledText,
              this.getRandomGlitchedChar(),
              this.getRandomTextIndex(this.jumbledText)
            );
          }
        } else {
          this.clearAll();
          this.unjumble();
        }
      }, this.intervalTime);
    },
    unjumble() {
      const unusedIndices = Array.from(this.jumbledText.split("").keys());
      this.interval.unjumble = setInterval(() => {
        if (unusedIndices.length !== 0) {
          const newIndex = this.getIndicesIndex(unusedIndices);
          this.jumbledText = this.replaceText(
            this.jumbledText,
            this.text[newIndex] ?? "",
            newIndex
          );
        } else {
          this.clearAll();
          clearInterval(this.interval.unjumble);
        }
      }, this.intervalTime);
    },
    appendToText(text: string, newChar: string, index: number) {
      return text.substring(0, index) + newChar + text.substring(index);
    },
    replaceText(text: string, newChar: string, index: number) {
      return (
        text.substring(0, index) +
        this.replaceCase(newChar)[0] +
        text.substring(index + 1)
      );
    },
    replaceCase(text: string): string {
      // MajorMono is a very clean font.. for the most part. This filters out ugly upper case characters.
      // TODO find a better font, since if font is not loaded correct the text would look very weird
      return text
        .split("")
        .map((char: string) => {
          let casedChar: string;
          if (this.allowedUpperCase.includes(char)) {
            casedChar = char.toUpperCase();
          } else {
            casedChar = char.toLowerCase();
          }

          return casedChar;
        })
        .join("");
    },
    getRandomGlitchedChar() {
      let randomIndex;
      let glitchedChar;
      randomIndex = Math.floor(Math.random() * this.glitchedCharacters.length);
      glitchedChar = this.glitchedCharacters[randomIndex];
      return glitchedChar;
    },
    getRandomTextIndex(text: string) {
      return Math.floor(Math.random() * text.length);
    },
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
  max-height: 40px;
}
</style>

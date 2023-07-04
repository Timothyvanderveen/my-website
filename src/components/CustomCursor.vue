<template>
  <div id="custom-cursor" ref="cursor" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomCursor",
  data: () => ({
    cursor: Object.create(HTMLElement.prototype, {}) as HTMLElement,
  }),
  computed: {},
  mounted() {
    this.cursor = this.$refs["cursor"] as HTMLElement;
    this.addListeners();
  },
  methods: {
    addListeners() {
      document.addEventListener("mousemove", (e) => {
        this.setCursor(e);
        this.setClickable(e);
      });

      document.onmousedown = () => {
        this.addClick();
      };

      document.onmouseup = () => {
        this.removeClick();
      };
    },
    setCursor({ clientX, clientY }: MouseEvent) {
      const offset = 33;
      const insideLeft = clientX > offset;
      const insideRight = clientX < innerWidth - offset;

      if (insideLeft && insideRight) {
        this.cursor.style.left = clientX + "px";
      } else {
        if (insideRight) {
          this.cursor.style.left = clientX + (offset - clientX) + "px";
        }
        if (insideLeft) {
          this.cursor.style.left =
            clientX + (innerWidth - offset - clientX) + "px";
        }
      }

      const insideTop = clientY > offset;
      const insideBottom = clientY < innerHeight - offset;

      if (insideTop && insideBottom) {
        this.cursor.style.top = clientY + "px";
      } else {
        if (insideBottom) {
          this.cursor.style.top = clientY + (offset - clientY) + "px";
        }
        if (insideTop) {
          this.cursor.style.top =
            clientY + (innerHeight - offset - clientY) + "px";
        }
      }
    },
    setClickable({ target }: MouseEvent) {
      if (
        target instanceof HTMLElement &&
        (target.classList.contains("clickable") || target.tagName === "A")
      ) {
        this.addClick();
      } else {
        this.removeClick();
      }
    },
    addClick() {
      this.cursor.classList.add("click");
    },
    removeClick() {
      this.cursor.classList.remove("click");
    },
  },
});
</script>

<style scoped lang="scss">
#custom-cursor {
  top: -10px;
  left: -10px;
  width: 1vmin;
  height: 1vmin;
  background: black;
  border-radius: 100%;
  position: fixed;
  z-index: 10000;
  pointer-events: none;
  translate: -50% -50%;

  transition: width 0.1s, height 0.1s, opacity 0.1s;
  transition-timing-function: ease-in-out;

  &.click:not(&.disabled) {
    width: 2vmin;
    height: 2vmin;
    opacity: 0.5;
  }
}
</style>

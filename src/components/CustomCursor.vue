<template>
  <div id="custom-cursor" ref="cursor" />
</template>

<script lang="ts" setup>
import { useContentStore } from "@/store/content";
import { ref } from "vue";

const cursor = ref<HTMLDivElement | null>(null);

const addListeners = () => {
  document.addEventListener("mousemove", (e) => {
    setCursor(e);
    setClickable(e);
  });

  document.onmousedown = () => {
    addClick();
  };

  document.onmouseup = () => {
    removeClick();
  };
};

const setCursor = ({ clientX, clientY }: MouseEvent) => {
  if (!cursor.value) return;

  const offset = useContentStore().vmin(5);
  const insideLeft = clientX > offset;
  const insideRight = clientX < innerWidth - offset;

  if (insideLeft && insideRight) {
    cursor.value.style.left = clientX + "px";
  } else {
    if (insideRight) {
      cursor.value.style.left = clientX + (offset - clientX) + "px";
    }
    if (insideLeft) {
      cursor.value.style.left =
        clientX + (innerWidth - offset - clientX) + "px";
    }
  }

  const insideTop = clientY > offset;
  const insideBottom = clientY < innerHeight - offset;

  if (insideTop && insideBottom) {
    cursor.value.style.top = clientY + "px";
  } else {
    if (insideBottom) {
      cursor.value.style.top = clientY + (offset - clientY) + "px";
    }
    if (insideTop) {
      cursor.value.style.top =
        clientY + (innerHeight - offset - clientY) + "px";
    }
  }
};

const setClickable = ({ target }: MouseEvent) => {
  if (
    target instanceof HTMLElement &&
    (target.classList.contains("clickable") || target.tagName === "A")
  ) {
    addClick();
  } else {
    removeClick();
  }
};

const addClick = () => {
  cursor.value?.classList.add("click");
};

const removeClick = () => {
  cursor.value?.classList.remove("click");
};

addListeners();
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

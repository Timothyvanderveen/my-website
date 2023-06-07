<template>
  <div class="navbar">
    <router-link
      class="navbar__item"
      :class="{
        active: isActive(navbarItem.url),
        hidden: isActive(navbarItem.url) && ![index, -1].includes(currentHover),
        hover: currentHover === index,
      }"
      v-for="(navbarItem, index) in navbarItems"
      :key="index"
      @mouseleave="unhover()"
      @mouseover="hover($event, index)"
      @click="$forceUpdate()"
      :to="navbarItem.url"
    >
      <div class="navbar__item--link">
        {{ navbarItem.label }}
      </div>
      <p class="navbar__item--active">{{ navbarItem.suffix ?? "." }}</p>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface NavbarItem {
  url: string;
  label: string;
  suffix: string | null;
  suffixWidth: string | null;
}

export default defineComponent({
  name: "LayoutNavbar",
  data: () => ({
    currentHover: -1,
    navbarItems: [
      {
        url: "/",
        label: "home",
      },
      {
        url: "/who-am-i",
        label: "who am i",
        suffix: "?",
      },
    ] as NavbarItem[],
  }),
  mounted() {
    this.unhover();
  },
  methods: {
    getActive(): NavbarItem | null {
      return this.navbarItems.find((f) => this.isActive(f.url)) ?? null;
    },
    isActive(url: string) {
      return window.location.pathname === url;
    },
    hover(event: MouseEvent, index: number) {
      this.currentHover = index;
      this.unhoverAll();

      const element = (event.target as HTMLElement).firstElementChild;
      if (element) {
        this.setSuffix(element as HTMLElement, this.navbarItems[index].suffix);
      }
    },
    unhover() {
      this.currentHover = -1;
      this.unhoverAll();

      const element = document.querySelector(
        ".navbar__item.active .navbar__item--link"
      );
      this.setSuffix(element as HTMLElement, this.getActive()?.suffix);
    },
    unhoverAll() {
      const elements = Array.from(
        document.getElementsByClassName("navbar__item--link")
      ) as HTMLElement[];

      elements.forEach((e) => {
        e.style.transform = "";
      });
    },
    setSuffix(element: HTMLElement, suffix: string | null = ".") {
      const width = suffix === "?" ? "24" : "13";
      element.style.transform = `translate(-${width}px, 0)`;
    },
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  // gap: 1em;

  .navbar__item {
    text-transform: lowercase;
    translate: 0em;
    cursor: pointer;
    font-size: 40px;
    font-weight: 600;

    .navbar__item--active {
      opacity: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 0;
      color: black;
      pointer-events: none;
      transition: opacity 0.2s ease-in-out;
    }

    .navbar__item--link {
      display: block;
      transition: transform 0.2s ease-in-out;
      z-index: 1;
      position: relative;
      pointer-events: none;
    }

    &.hidden {
      .navbar__item--active {
        opacity: 0 !important;
      }
    }

    &.active,
    &:hover:not(.active) {
      .navbar__item--active {
        opacity: 1;
      }
    }
  }
}
</style>

<template>
  <div class="navbar">
    <router-link
      class="navbar__item"
      :class="{
        active: navbarItem.active,
        hidden: navbarItem.active && ![index, -1].includes(currentHover),
        hover: currentHover === index,
      }"
      v-for="(navbarItem, index) in navbarItems"
      :key="index"
      @mouseleave="unhover()"
      @mouseenter="hover($event, index)"
      :to="navbarItem.url"
    >
      <GlitchedText
        class="navbar__item--link"
        :text="navbarItem.label"
        :hover="true"
      />
      <!-- <div class="navbar__item--link">
        {{ navbarItem.label }}
      </div> -->

      <!-- <GlitchedText
        class="navbar__item--active"
        :text="navbarItem.suffix ?? '.'"
      /> -->
      <h1 class="navbar__item--active">
        {{ navbarItem.suffix ?? "." }}
      </h1>
    </router-link>
  </div>
</template>

<script lang="ts">
import GlitchedText from "@/components/GlitchedText.vue";
import { defineComponent } from "vue";

interface NavbarItem {
  url: string;
  label: string;
  suffix: string | null;
  active: boolean;
  hover: boolean;
}

export default defineComponent({
  name: "LayoutNavbar",
  components: { GlitchedText },
  data: () => ({
    currentPath: location.pathname,
    currentHover: -1,
  }),
  // TODO move to store
  watch: {
    $route(to) {
      window.scrollTo(0, 0);
      this.currentPath = to.path;
    },
  },
  computed: {
    navbarItems() {
      const navbarItems = [
        {
          url: "/",
          label: "home",
          active: false,
          hover: false,
        },
        {
          url: "/who-am-i",
          label: "who am i",
          suffix: "?",
          active: false,
          hover: false,
        },
      ] as NavbarItem[];

      return navbarItems.map((m: NavbarItem, index) => {
        m.active = m.url === this.currentPath;
        m.hover = index === this.currentHover;
        return m;
      });
    },
  },
  mounted() {
    this.unhover();
  },
  methods: {
    getActive(): NavbarItem | null {
      return this.navbarItems.find((f) => f.active) ?? null;
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
      this.setActive();
    },
    setActive() {
      const element = document.querySelector(
        ".navbar__item.active .navbar__item--link"
      );
      if (element) {
        this.setSuffix(element as HTMLElement, this.getActive()?.suffix);
      }
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
      // const width = suffix === "?" ? "29" : "10";
      element.style.transform = `translate(-${29}px, 0)`;
    },
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  top: 50%;
  /* position: absolute; */
  // gap: 1em;

  .navbar__item {
    text-transform: lowercase;
    translate: 0em;
    cursor: pointer;

    .navbar__item--active {
      opacity: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 0;
      color: black;
      transition: opacity 0.2s ease-in-out;
    }

    .navbar__item--link {
      display: block;
      transition: transform 0.2s ease-in-out;
      z-index: 1;
      position: relative;
      max-height: 40px;
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

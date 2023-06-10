<template>
  <div class="navbar">
    <div class="navbar__menu">
      <div
        class="navbar__item"
        :class="{
          active: index === activeIndex,
          hidden: navbarItem.active && ![index, -1].includes(currentHover),
          hover: currentHover === index,
        }"
        v-for="(navbarItem, index) in navbarItems"
        :key="index"
        @mouseleave="unhover()"
        @mouseenter="hover($event, index)"
        @click="activate(index)"
      >
        <GlitchedText
          class="navbar__item--link clickable"
          :class="{ disabled: currentHover === index }"
          :text="getText(navbarItem, index)"
          :hover="!navbarItem.active"
        />
        <!-- <div class="navbar__item--link">
        {{ navbarItem.label }}
      </div> -->

        <!-- <GlitchedText
        class="navbar__item--active"
        :text="navbarItem.suffix ?? '.'"
      /> -->
        <!-- <h1 class="navbar__item--active">
          {{
            ((navbarItem.active && currentHover === -1) ||
              index === currentHover) &&
            navbarItem.activeSuffix
              ? navbarItem.activeSuffix
              : navbarItem.suffix
          }}
        </h1> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GlitchedText from "@/components/GlitchedText.vue";
import { defineComponent } from "vue";

interface NavbarItem {
  activeLabel: string | null;
  label: string;
  suffix: string;
  hoverSuffix: string;
  active: boolean;
  hover: boolean;
  scrollTo: number;
}

export default defineComponent({
  name: "LayoutNavbar",
  components: { GlitchedText },
  data: () => ({
    currentPath: location.pathname,
    currentHover: -1,
    activeIndex: 0,
  }),
  computed: {
    navbarItems() {
      const navbarItems = [
        {
          activeLabel: null,
          label: "home",
          suffix: ".",
          hoverSuffix: ">",
          active: false,
          hover: false,
          scrollTo: 0,
        },
        {
          activeLabel: "i am",
          label: "who am i",
          suffix: ".",
          hoverSuffix: "?",
          active: false,
          hover: false,
          scrollTo: innerHeight / 2,
        },
        {
          activeLabel: "i do",
          label: "what do i do",
          hoverSuffix: "?",
          suffix: ".",
          active: false,
          hover: false,
          scrollTo: innerHeight * 1.5,
        },
      ] as NavbarItem[];

      return navbarItems.map((m: NavbarItem, index) => {
        m.active = this.activeIndex === index;
        m.hover = index === this.currentHover;
        return m;
      });
    },
    getActive(): NavbarItem | null {
      return this.navbarItems.find((f) => f.active) ?? null;
    },
    getActiveIndex(): number {
      return this.navbarItems.findIndex((f) => f.active) ?? null;
    },
  },
  mounted() {
    this.unhover();
  },
  methods: {
    activate(index: number) {
      this.activeIndex = index;
      scrollTo(0, this.getActive?.scrollTo ?? 0);
    },
    getText(navbarItem: NavbarItem, index: number) {
      const active = navbarItem.active;
      const noHover = this.currentHover === -1;
      const isHover = index === this.currentHover;
      let newLabel = "";
      let suffix = "";

      if (active) {
        newLabel = navbarItem.activeLabel ?? navbarItem.label;

        if (noHover || isHover) {
          suffix = navbarItem.suffix;
        }
      }

      if (!active) {
        newLabel = navbarItem.label;

        if (isHover) {
          suffix = navbarItem.hoverSuffix;
        }
      }

      // if (active && noHover) {
      //   newLabel =
      //     active && navbarItem.activeLabel
      //       ? navbarItem.activeLabel
      //       : navbarItem.label;
      //   suffix = navbarItem.suffix;
      // }

      // if (isHover) {
      //   suffix = active ? navbarItem.suffix : navbarItem.hoverSuffix;
      // }

      return newLabel + suffix;
    },
    hover(event: MouseEvent, index: number) {
      this.currentHover = index;
      this.unhoverAll();
      const element = (event.target as HTMLElement).firstElementChild;
      if (element) {
        // this.setSuffix(element as HTMLElement, this.navbarItems[index].suffix);
        // if (
        //   this.currentHover >= 0 &&
        //   this.currentHover !== this.getActiveIndex
        // ) {
        //   element.dispatchEvent(new Event("jumble"));
        // }
      }
    },
    unhover() {
      this.unhoverAll();
      this.setActive();
      this.currentHover = -1;
    },
    setActive() {
      const element = document.querySelector(
        ".navbar__item.active .navbar__item--link"
      ) as HTMLElement;
      if (element) {
        // if (
        //   this.currentHover >= 0 &&
        //   this.currentHover !== this.getActiveIndex
        // ) {
        //   // element.dispatchEvent(new Event("jumble"));
        // }
        // this.setSuffix(element as HTMLElement, this.getActive?.suffix);
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
      const width = suffix === "?" ? "29" : "20";
      element.style.transform = `translate(-${width}px, 0)`;
    },
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.navbar__menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  min-width: 100%;
  gap: 1em;

  .navbar__item {
    text-transform: lowercase;
    translate: 0em;
    line-height: 26px;
    height: 30.3px;

    * {
      font-size: 30px;
    }

    .navbar__item--active {
      opacity: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 0;
      color: black;
      transition: opacity 0.2s ease-in-out;
      pointer-events: none;
    }

    .navbar__item--link {
      display: block;
      transition: transform 0.2s ease-in-out;
      z-index: 1;
      position: relative;
      max-height: 40px;
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

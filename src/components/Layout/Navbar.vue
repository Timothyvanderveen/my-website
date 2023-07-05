<template>
  <div ref="navbar" class="navbar">
    <div class="navbar__menu">
      <div
        v-for="(navbarItem, index) in navbarItems"
        :key="index"
        class="navbar__item"
        :class="{
          active: navbarItem.active,
          hover: navbarItem.hover,
          clickable: !navbarItem.active,
        }"
        @mouseleave="unhover()"
        @mouseenter="hover(navbarItem)"
        @mousemove="hover(navbarItem)"
        @click="activate(navbarItem)"
      >
        <p
          v-glitched="getNavbarText(navbarItem)"
          class="navbar__item--link primary-font"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NavbarItem, useContentStore } from "@/store/content";
import { useScrollerStore } from "@/store/scroller";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutNavbar",
  computed: {
    ...mapState(useContentStore, [
      "navbarItems",
      "getActive",
      "getHover",
      "getNavbarText",
    ]),
    ...mapState(useScrollerStore, ["isScrolling"]),
  },
  mounted() {
    this.unhover();
    useScrollerStore().addScrollAction(() => {
      this.setNavbarHeight();
    });
  },
  methods: {
    ...mapActions(useContentStore, ["activateNavbarItem", "hoverNavbarItem"]),
    ...mapActions(useScrollerStore, ["scrollTo"]),
    setNavbarHeight() {
      const navbar = this.$refs["navbar"] as HTMLElement;
      const getContentPageFirst =
        document.getElementsByClassName("content__page")[0];
      const { scrollTop } = document.getElementById("app") as HTMLElement;

      if (!navbar || !getContentPageFirst || !scrollTop) {
        return;
      }

      const firstPageBottomRect = getContentPageFirst.getBoundingClientRect();
      const borderWidth = useContentStore().vmin(5);

      if (scrollTop >= innerHeight / 2 - borderWidth) {
        navbar.style.top = borderWidth + "px";
      } else {
        let newTop = (firstPageBottomRect.bottom - scrollTop + borderWidth) / 2;
        navbar.style.top = newTop + "px";
      }
    },
    activate(navbarItem: NavbarItem) {
      if (!navbarItem.active) {
        this.activateNavbarItem(navbarItem, true);
      }
    },
    hover(navbarItem: NavbarItem) {
      if (this.isScrolling || navbarItem.hover) return;
      this.hoverNavbarItem(navbarItem);
    },
    unhover() {
      this.hoverNavbarItem();
    },
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 50%;
  bottom: $outsideBorder;
  display: flex;
  width: 320px;
  flex-direction: column;
  justify-content: center;
  z-index: 5;
}
.navbar__menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  min-width: 100%;
  gap: 1em;

  .navbar__item {
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
      // line-height: $primary-font-size;
      // height: $primary-font-size;
      pointer-events: none;
      font-size: 4vmin;
      white-space: nowrap;
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

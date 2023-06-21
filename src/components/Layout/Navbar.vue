<template>
  <div class="navbar" ref="navbar">
    <div class="navbar__menu">
      <div
        class="navbar__item"
        :class="{
          active: navbarItem.active,
          hover: navbarItem.hover,
          clickable: !navbarItem.active,
        }"
        v-for="(navbarItem, index) in navbarItems"
        :key="index"
        @mouseleave="unhover()"
        @mouseenter="hover(navbarItem)"
        @click="activate(navbarItem)"
      >
        <GlitchedText
          class="navbar__item--link"
          :text="getNavbarText(navbarItem)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GlitchedText from "@/components/GlitchedText.vue";
import { NavbarItem, useContentStore } from "@/store/content";
import { useScrollerStore } from "@/store/scroller";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutNavbar",
  components: { GlitchedText },
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

      if (!navbar || !getContentPageFirst) {
        return;
      }

      const firstPageBottomRect = getContentPageFirst.getBoundingClientRect();

      let newTop = firstPageBottomRect.bottom / 2 - 15;

      navbar.style.top = newTop + "px";

      if (newTop <= 0) {
        navbar.style.top = "0";
        return;
      }
    },
    activate(navbarItem: NavbarItem) {
      if (!navbarItem.active) {
        this.activateNavbarItem(navbarItem, true);
      }
    },
    hover(navbarItem: NavbarItem) {
      if (this.isScrolling) return;
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
  position: absolute;
  top: 51%;
  bottom: 0;
  display: flex;
  width: 320px;
  flex-direction: column;
  justify-content: center;
  z-index: 5;
  top: calc(50% - -3px);
}
.navbar__menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  min-width: 100%;
  gap: 1em;

  .navbar__item {
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

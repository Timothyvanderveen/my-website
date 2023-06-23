import { defineStore } from "pinia";
import { useScrollerStore } from "./scroller";

export interface NavbarItem {
  text: { default: string; active?: string };
  active: boolean;
  id: number;
  hover: boolean;
  hash: string;
  title: string;
}

export interface State {
  fontLoaded: boolean;
  navbarItems: NavbarItem[];
}

export const useContentStore = defineStore("content", {
  state: (): State => ({
    fontLoaded: false,
    navbarItems: [
      {
        id: 1,
        text: {
          default: "home",
          active: "home.",
        },
        active: true,
        hover: false,
        hash: "#home",
        title: "Home",
      },
      {
        id: 2,
        text: {
          default: "Who am i",
          active: "i am.",
        },
        active: false,
        hover: false,
        hash: "#about-me",
        title: "About Me",
      },
      {
        id: 3,
        text: {
          default: "stack",
          active: "my stack.",
        },
        active: false,
        hover: false,
        hash: "#my-stack",
        title: "My Stack",
      },
      {
        id: 4,
        text: {
          default: "projects",
          active: "my projects.",
        },
        active: false,
        hover: false,
        hash: "#my-projects",
        title: "My Projects",
      },
      {
        id: 5,
        text: {
          default: "socials",
          active: "my socials.",
        },
        active: false,
        hover: false,
        hash: "#my-socials",
        title: "My Socials",
      },
    ],
  }),
  actions: {
    scrollToActive(smooth = true) {
      useScrollerStore().goTo(this.getActive.id, smooth);
    },
    activateByID(id: number, scroll = false) {
      const newNavbarItem =
        this.navbarItems.find((e) => e.id === id) ?? this.navbarItems[0];

      this.activateNavbarItem(newNavbarItem, scroll);
    },
    hoverByID(id: number) {
      this.$patch({
        navbarItems: this.navbarItems.map((e) => {
          e.hover = id === e.id && !e.active;
          return e;
        }),
      });
    },
    activateByHash(scroll = false, smooth = true) {
      const newNavbarItem =
        this.navbarItems.find((e) => e.hash === location.hash) ??
        this.navbarItems[0];

      this.activateNavbarItem(newNavbarItem, scroll, smooth);
    },
    activateNext(scroll = false) {
      const activeId = this.getActive.id;
      const newNavbarItem =
        this.navbarItems.find((e) => e.id === activeId + 1) ??
        this.navbarItems[0];

      this.activateNavbarItem(newNavbarItem, scroll);
    },
    activatePrev(scroll = false) {
      const activeId = this.getActive.id;
      const newNavbarItem =
        this.navbarItems.find((e) => e.id === activeId - 1) ??
        this.navbarItems[0];

      this.activateNavbarItem(newNavbarItem, scroll);
    },
    activateNavbarItem(navbarItem: NavbarItem, scroll = false, smooth = true) {
      this.$patch({
        navbarItems: this.navbarItems.map((e) => {
          e.active = navbarItem.id === e.id;
          return e;
        }),
      });

      window.location.hash = this.getActive.hash;
      document.title = `${this.getActive.title} - Timothy van der Veen`;

      if (scroll) {
        this.scrollToActive(smooth);
      }
    },
    hoverNavbarItem(navbarItem?: NavbarItem) {
      this.$patch({
        navbarItems: this.navbarItems.map((e) => {
          e.hover = navbarItem ? navbarItem.id === e.id : false;
          return e;
        }),
      });
    },
    setFontLoaded() {
      this.$patch({
        fontLoaded: document.fonts.check("40px MajorMono"),
      });
    },
    vh(percent: number) {
      const h = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      return (percent * h) / 100;
    },
    vw(percent: number) {
      const w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      return (percent * w) / 100;
    },
    vmin(percent: number) {
      return Math.min(this.vh(percent), this.vw(percent));
    },
  },
  getters: {
    getNavbarText: (state) => (navbarItem: NavbarItem) => {
      if (navbarItem.active) {
        return navbarItem.text.active ?? "";
      }
      if (navbarItem.hover) {
        return (navbarItem.text.default ?? "") + ">";
        // return navbarItem.text.hover ?? "";
      }
      return navbarItem.text.default ?? "";
    },
    getActive: (state): NavbarItem => {
      return state.navbarItems.find((f) => f.active) ?? state.navbarItems[0];
    },
    getHover: (state) => {
      return state.navbarItems.find((f) => f.hover) ?? state.navbarItems[0];
    },
    getActiveBreakpoint(): number {
      return (this.getActive.id - 1) * innerHeight;
    },
    getHashes(state): string[] {
      return state.navbarItems.map((e) => e.hash);
    },
  },
});

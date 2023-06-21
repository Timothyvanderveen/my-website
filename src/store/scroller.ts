import { _StoreWithState, defineStore } from "pinia";
import { useContentStore } from "./content";

export interface State {
  isScrolling: boolean;
  goToIndex: number;
  scrollingTimer: number;
  scrollActions: CallableFunction[];
}

export const useScrollerStore = defineStore("scroller", {
  state: (): State => ({
    isScrolling: false,
    scrollingTimer: 0, // TODO,
    goToIndex: -1,
    scrollActions: [
      function () {
        const scrolledID =
          Math.round(useScrollerStore().getScrollTop() / innerHeight) + 1;
        if (useScrollerStore().goToIndex === -1) {
          useContentStore().activateByID(scrolledID);
        }
      },
    ] as CallableFunction[],
  }),
  getters: {
    getScrollElement: () =>
      document.getElementById("custom-scroll") as HTMLElement,
  },
  actions: {
    getApp: () => {
      return document.getElementById("app") as HTMLElement;
    },
    getScrollTop() {
      return this.getApp().scrollTop - 10;
    },
    addScrollAction(scrollAction: CallableFunction) {
      const scrollActions = this.scrollActions;
      scrollActions.push(scrollAction);

      this.$patch({
        scrollActions: scrollActions,
      });
    },
    createListeners() {
      this.getApp().addEventListener(
        "scroll",
        () => {
          this.scrollActions.forEach((scrollAction) => scrollAction());
          this.setTimer();
        },
        false
      );
      this.getApp().addEventListener(
        "wheel",
        () => {
          this.scrollActions.forEach((scrollAction) => scrollAction());
        },
        false
      );
    },
    goTo(id: number, smooth = true) {
      this.$patch({
        goToIndex: id,
      });

      useScrollerStore().scrollTo((id - 1) * innerHeight, smooth);
    },
    scrollTo(to: number, smooth = true) {
      const behaviour = smooth ? "smooth" : "instant";
      this.$patch({ isScrolling: true });
      (document.getElementById("app") as HTMLElement).scrollTo({
        top: to,
        behavior: behaviour as ScrollBehavior,
      });
    },
    setTimer() {
      clearTimeout(this.scrollingTimer);
      this.$patch({
        scrollingTimer: setTimeout(() => {
          this.$patch({
            goToIndex: -1,
            isScrolling: false,
          });
        }, 100),
      });
    },
  },
});

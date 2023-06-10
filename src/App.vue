<template>
  <div id="cursor" ref="cursor" />
  <!-- <div ref="cursor" class="cursor" /> -->
  <KeepAlive>
    <LayoutBanner ref="banner" />
  </KeepAlive>

  <!-- <div
    style="
      border: 4px solid black;
      top: 50%;
      left: 0;
      right: 0;
      position: fixed;
      z-index: 10000;
      translate: 0 -50%;
    "
  /> -->

  <div class="content" ref="content">
    <div class="content__scroll-indicator" ref="scrollIndicator" />
    <div class="content__bar" ref="contentBar">
      <LayoutNavbar />
    </div>

    <div class="content__view" ref="contentView" :key="currentPath">
      <div class="content__view--page">test</div>
      <div class="content__view--page">test</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LayoutBanner from "@/components/Layout/Banner.vue";
import LayoutNavbar from "@/components/Layout/Navbar.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    LayoutBanner,
    LayoutNavbar,
  },
  data: () => ({
    currentPath: location.pathname,
    name: null as null | HTMLElement,
    scrolling: false,
    scrollLast: 0,
    scrollYVar: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug: {} as any,
  }),
  watch: {
    $route(to) {
      window.scrollTo(0, 0);
      this.currentPath = to.path;
    },
    scrolling(value) {
      if (value) {
        document.documentElement.classList.add("scrolling");
      } else {
        document.documentElement.classList.remove("scrolling");
      }
    },
  },
  beforeUpdate() {
    this.updateLayout();
  },

  // TODO CLEAN UP !!!
  mounted() {
    // TODO addeventlisteners
    this.name = document.getElementById(
      "layout__banner--surname"
    ) as HTMLElement;

    this.updateLayout();

    const cursor = this.$refs["cursor"] as HTMLElement;

    window.onresize = () => {
      this.updateLayout();
    };

    let timer = 0;
    const breakPoints = [0, innerHeight / 2, innerHeight * 1.5];
    let breakPointIndex = 0;
    let deltaNeeded = 0;

    document.addEventListener(
      "wheel",
      (e) => {
        const scrollYRounded = scrollY;
        const bannerHeight = innerHeight / 2;

        deltaNeeded = deltaNeeded + e.deltaY;

        if (
          (e.deltaY > 0 && deltaNeeded < 0) ||
          scrollY >= breakPoints[breakPointIndex + 1]
        ) {
          deltaNeeded = 0;
        } else if (
          ((e.deltaY < 0 && deltaNeeded > 0) ||
            scrollY <= breakPoints[breakPointIndex - 1]) ??
          breakPoints.length
        ) {
          deltaNeeded = 0;
        }

        if (
          this.scrolling ||
          (deltaNeeded < innerHeight * 1.5 && deltaNeeded > -innerHeight * 1.5)
        ) {
          e.preventDefault();
          e.stopPropagation();

          return;
        } else {
          e.preventDefault();

          deltaNeeded = 0;

          // if (scrollYRounded < bannerHeight) {
          if (e.deltaY > 0) {
            this.scrolling = true;
            if (breakPointIndex < breakPoints.length - 1) {
              breakPointIndex++;
            }
          }
          if (e.deltaY < 0) {
            this.scrolling = true;
            if (breakPointIndex > 0) {
              breakPointIndex--;
            }
          }

          scrollTo({
            top: breakPoints[breakPointIndex] ?? "0",
            behavior: "smooth",
          });
        }

        if (timer !== 0) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          this.scrolling = false;
          deltaNeeded = 0;
        }, 200);
        // }
      },
      {
        passive: false,
      }
    );

    document.onscroll = () => {
      this.setNamePosition();
      this.setContentBars();
      this.setScrollbar();

      if (timer !== 0) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        this.scrolling = false;
        deltaNeeded = 0;
      }, 200);
    };

    document.querySelectorAll(".clickable").forEach((e) => {
      e.addEventListener("mouseenter", () => cursor.classList.add("click"));
      e.addEventListener("mouseleave", () => cursor.classList.remove("click"));
    });

    document.onmousemove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursor.style.left = clientX + "px";
      cursor.style.top = clientY + "px";
    };

    document.onmousedown = () => {
      cursor.classList.add("click");
    };

    document.onmouseup = () => {
      cursor.classList.remove("click");
    };
  },
  methods: {
    updateLayout() {
      this.setNamePosition();
      this.setContentBars();
      // this.setScrollbar();
    },
    setContentBars() {
      const contentBar = this.$refs["contentBar"] as HTMLElement;

      if (!contentBar) {
        return;
      }
      const bannerHeight = innerHeight / 2;
      const newHeightOffset = bannerHeight - scrollY;
      if (newHeightOffset >= 0) {
        contentBar.style.height = `calc(100vh - ${Math.floor(
          newHeightOffset
        )}px)`;
      }
    },
    setNamePosition() {
      if (!this.name) {
        return;
      }
      const bannerHeight = innerHeight / 2;
      if (scrollY >= bannerHeight) {
        this.name.style.top = "-39px";
        this.name.style.position = "fixed";
      } else {
        this.name.style.top = "";
        this.name.style.position = "absolute";
      }
    },
    setScrollbar() {
      const bannerHeight = innerHeight / 2;
      const scrollIndicator = this.$refs.scrollIndicator as HTMLElement;
      const htmlElement = document.documentElement;
      if (!scrollIndicator) {
        return;
      }
      if (scrollY < bannerHeight && scrollY >= 0) {
        scrollIndicator.style.top = `${bannerHeight - scrollY}px`;
        scrollIndicator.style.width = "0";
        htmlElement.classList.remove("htmlElement");
        return;
      }

      htmlElement.classList.add("snap");

      const newScrollY = scrollY - bannerHeight;
      const scrollBarHeight = innerHeight * 0.1;
      const totalHeight = htmlElement.offsetHeight - bannerHeight - innerHeight;
      const percent = newScrollY / totalHeight;
      scrollIndicator.style.top = `${Math.round(
        percent * (innerHeight - scrollBarHeight)
      )}px`;
      scrollIndicator.style.width = "8px";
    },
  },
});
</script>

<style lang="scss">
.content {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: $white;
  // min-height: calc(100vh + 400px);
}

.content__bar {
  width: $content-bar-width;
  position: absolute;
  position: fixed;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  left: 0;
}

.content__view {
  margin: 0 20%;
  width: 100%;
  font-family: PoiretOne;
  font-weight: 600;
  text-align: right;

  .content__view--page {
    // scroll-snap-align: start;
    // height: calc(100vh - 40px);
    height: calc(100vh - 10em);
    // background: red;

    padding: 5em; // border: dashed 20px;
  }
}

.content__scroll-indicator {
  transition: width 0.2s ease-in-out;
  // translate: 0 20vh;
  background: black;
  position: fixed;
  height: calc(10vh + 2px);
  width: 0;
  top: 0;
}
</style>

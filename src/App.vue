<template>
  <div class="welcome-text__wrapper" v-if="!isMobile()">
    <GlitchedText :text="text" class="welcome-text" />
  </div>
  <div class="content__container" id="content-container" v-if="!isMobile()">
    <LayoutNavbar />
    <div class="content__wrapper">
      <ContentPage :wideHr="true">
        <template v-slot:upper>
          <GlitchedText
            text="timothy"
            class="content__page--upper__header primary-font"
            id="firstname"
          />
        </template>

        <template v-slot:lower>
          <GlitchedText
            ref="surname"
            text="van der Veen"
            class="content__page--lower__header primary-font"
            id="surname"
          />
        </template>
      </ContentPage>

      <ContentPage :full="true">
        <template v-slot:full>
          <div class="about-me__wrapper">
            <p class="about-me">
              <span
                v-for="(spanText, index) in aboutMeSpanArray"
                :key="index"
                class="secondary-font"
              >
                {{ spanText }}
              </span>
            </p>
          </div>
        </template>
      </ContentPage>

      <ContentPage :full="true">
        <template v-slot:full>
          <div class="stack-list padded-height">
            <div
              class="stack"
              v-for="(stack, index) in stackArray"
              :key="index"
            >
              <GlitchedText :text="stack" />
            </div>
          </div>
        </template>

        <template v-slot:lower />
      </ContentPage>

      <ContentPage :full="true">
        <template v-slot:full>
          <div class="project-list padded-height">
            <div
              class="project"
              v-for="(project, index) in projects"
              :key="index"
            >
              <GlitchedText
                @mouseenter="projectHover = index"
                @mouseleave="projectHover = -1"
                :text="
                  projectHover === index ? `${project.text}>` : project.text
                "
              >
                <template v-slot="slotProps">
                  <a target="_blank" :href="`//${project.href}`">
                    {{ slotProps.text }}
                  </a>
                </template>
              </GlitchedText>

              <GlitchedText
                @mouseenter="projectCompany = index"
                @mouseleave="projectCompany = -1"
                :text="
                  projectCompany === index
                    ? `${project.company}>`
                    : project.company
                "
                class="project-company"
              >
                <template v-slot="slotProps">
                  <a target="_blank" :href="`//${project.companyHref}`">
                    {{ slotProps.text }}
                  </a>
                </template>
              </GlitchedText>
            </div>
          </div>
        </template>
      </ContentPage>

      <ContentPage :full="true">
        <template v-slot:full>
          <div class="social-list padded-height">
            <div class="social" v-for="(social, index) in socials" :key="index">
              <GlitchedText
                @mouseenter="socialHover = index"
                @mouseleave="socialHover = -1"
                :text="socialHover === index ? `${social.text}>` : social.text"
              >
                <template v-slot="slotProps">
                  <a
                    :target="social.href !== '' ? '_blank' : ''"
                    :href="`//${social.href}`"
                  >
                    {{ slotProps.text }}
                  </a>
                </template>
              </GlitchedText>
            </div>
          </div>
        </template>
      </ContentPage>
    </div>
    <CustomCursor />
  </div>
  <div class="mobile__placeholder" v-else>
    <GlitchedText text="Mobile version coming soon" />
  </div>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent } from "vue";
import LayoutNavbar from "@/components/Layout/Navbar.vue";
import CustomCursor from "@/components/CustomCursor.vue";
import GlitchedText from "./components/GlitchedText.vue";
import { useContentStore } from "./store/content";
import { useScrollerStore } from "./store/scroller";
import { mapState } from "pinia";
import ContentPage from "./components/content/ContentPage.vue";

// TODO move content to own components and add component to content store array
// TODO move project list to own component
// TODO move stack list to own component
// TODO move social list to own component
// TODO important: clean up App, should hold way less logic

export default defineComponent({
  name: "App",
  data: () => ({
    stackArray: [
      "JavaScript",
      "TypeScript",
      "CSS",
      "SASS",
      "NPM/YARN",
      "AXIOS",
      "JQuery",
      "HTML",
      "Vue",
      "Nuxt",
      "Bootstrap",
      "ESlint",
      "Prettier",
      "Postman",
      "JSON",
      "MySql/MariaDB",
      "WSL2",
      "Bash",
      "PHP",
      "Yii2",
      "Github",
    ],
    projectHover: -1,
    projectCompany: -1,
    projects: [
      {
        text: "spell-it",
        href: "spellit.nl",
        company: "nio communicatie & internet",
        companyHref: "niocommunicatie.nl",
      },
      {
        text: "schoolkr8",
        href: "schoolkr8.nl",
        company: "nio communicatie & internet",
        companyHref: "niocommunicatie.nl",
      },
    ],
    socialHover: -1,
    socials: [
      {
        text: "github",
        href: "github.com/Timothyvanderveen",
      },
      {
        text: "linkedin",
        href: "linkedin.com/in/timothyvanderveen/",
      },
      {
        text: "instagram",
        href: "instagram.com/t.vdveen_/",
      },
      // {
      //   text: "contact form",
      //   hover: "coming soon",
      //   href: "",
      // },
    ],
    texts: {
      welcome: [
        "welcome", // English
        "bienvenido", // Spanish
        "willkommen", // German
        "bem-vindo", // Portuguese
        "benvenuto", // Italian
        "bienvenue", // French
        "välkommen", // Swedish
        "velkommen", // Norwegian
        "witaj", // Polish
      ],
      interactions: [
        "how are you?",
        "nice to meet you",
        ":)",
        "<3",
        "stay awhile",
        "made with love",
      ],
    },
    text: "welcome",
    textType: 0,
    interval: 2000,
    timeout: 0,
  }),
  beforeMount() {
    document.fonts.ready.then(() => {
      useContentStore().setFontLoaded();
    });
  },
  mounted() {
    this.updateText();
    useContentStore().activateByHash(true, false);
    useScrollerStore().addScrollAction(() => {
      const ref = this.$refs["surname"] as ComponentPublicInstance;
      const surname = ref?.$el as HTMLElement;
      const app = document.getElementById("app") as HTMLElement;

      if (!surname || !ref) return;

      const newTop = app.scrollTop;

      const style = { top: "0", position: "absolute", right: "0" };

      const innerPadding = useContentStore().vmin(3);
      const outerBorder = useContentStore().vmin(5);

      if (app.scrollTop >= innerHeight / 2 - outerBorder) {
        style.top = `calc(50vh - ${app.scrollTop}px + 0.3vmin)`;
        style.position = `fixed`;
        style.right = innerPadding + outerBorder + "px";
      }

      if (app.scrollTop >= innerHeight / 2 - useContentStore().vmin(0.3)) {
        style.top = "0.7vmin";
        style.position = `fixed`;
        style.right = innerPadding + outerBorder + "px";
      }

      surname.style.top = style.top;
      surname.style.position = style.position;
      surname.style.right = style.right;
    });

    useScrollerStore().createListeners();
  },
  computed: {
    ...mapState(useContentStore, ["getActive"]),
    getBirthYear() {
      let birthdateTimeStamp = new Date(1997, 5, 25);
      let diff = new Date().getTime() - birthdateTimeStamp.getTime();
      let currentAge = Math.floor(diff / 31557600000);
      // Divide by 1000*60*60*24*365.25

      return currentAge;
    },
    aboutMeSpanArray() {
      return [
        "Hello there",
        "I am Timothy van der Veen",
        `a ${this.getBirthYear} year old`,
        "fullstack developer",
        "from Groningen",
        "In the captivating",
        "realm of web development",
        "variables speak",
        "louder than words",
        "Instead of writing a resume",
        "full of half-truths",
        "and exaggerated claims",
        "I prefer to let",
        "my skills do the talking",
      ];
    },
  },
  watch: {
    getActive(to) {
      if (to.id === 1) {
        this.text = "back again?";
        this.updateText();
      }
    },
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    updateText() {
      this.interval = 4000;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.text = useContentStore().fontLoaded ? this.text : "Incorrect font";

        let textArray = [] as string[];

        this.interval = Math.random() * (10000 - 4000) + 4000;

        if (Math.random() > 0.45 || this.textType === 1) {
          this.textType = 0;
          textArray = this.texts.welcome;
        } else {
          this.textType = 1;
          textArray = this.texts.interactions;
        }

        const index = Math.round(Math.random() * (textArray.length - 1));
        const newText = textArray[index];
        this.text = newText;
        this.updateText();
      }, this.interval);
    },
  },
  components: {
    LayoutNavbar,
    CustomCursor,
    GlitchedText,
    ContentPage,
  },
});
</script>
<style lang="scss">
.content__container {
  width: 100%;
  height: calc(100vh - 4vmin);
  background: $white;
  z-index: 1;

  .content__wrapper {
    width: 100%;
    background-color: $white;
    scroll-snap-align: start;
    height: 100%;
    margin-top: -3vmin;

    #firstname {
      z-index: 0;
      position: fixed;
      right: calc($outsideBorder + $insidePadding);
      top: 46.31vh;
    }
    #surname {
      // top: -1.1vh;
      z-index: 5;
      position: absolute;
    }
    .content__page:first-child {
      .content__page--upper {
        background: unset !important;
      }
    }
  }
}

.welcome-text__wrapper {
  position: fixed;
  overflow: hidden;
  inset: 0;
  top: $outsideBorder;
  z-index: 0;
  height: calc(50vh - 5vmin);
  width: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;

  .welcome-text {
    opacity: 0.15;
    font-size: 8vmin !important;
    max-height: 8vmin !important;
    overflow: visible !important;
  }
}

.about-me__wrapper {
  height: calc(100% - 20px);
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .about-me {
    text-align: right;
    text-transform: lowercase;

    span {
      margin: 1vmin 0;
      font-family: "MajorMono";
      max-height: unset;
      display: block;
    }
  }
}

// .project-list {
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: calc(100% - 8vh);
//   gap: 2vh;
//   margin-top: 4vh;
//   justify-content: flex-start;
//   flex-wrap: nowrap;
//   align-items: flex-end;
// }

.padded-height {
  height: calc(100% - ($insidePadding * 2));
  position: absolute;
  top: $insidePadding;
}

.social-list {
  gap: 2vmin;
}

.stack-list,
.project-list,
.social-list {
  display: flex;
  flex-direction: column;
  right: 0;
  position: absolute;
  // gap: 1vh;
  justify-content: center;

  * {
    text-align: right;
  }

  .stack * {
    font-size: 2.8vh !important;
    max-height: 2.8vh;
  }
  // .project *,
  // .social * {
  //   font-size: 3.5vw !important;
  //   max-height: 3.5vw;
  // }
  .project-company {
    max-height: 2vw;
    * {
      display: block;
      font-size: 1.5vw !important;
      max-height: 1.5vw;
    }
  }
}

.project-list {
  gap: 10vh;
}

.mobile__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  align-content: center;
  width: 100%;

  .glitched-text__wrapper {
    white-space: normal;
    height: fit-content;
    max-height: unset;
    max-width: calc(100vw - 130px);
    overflow-wrap: break-word;
    font-size: 9vw;

    line-height: unset !important;
    height: fit-content !important;
  }
}
</style>

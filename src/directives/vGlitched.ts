import { Directive, DirectiveBinding } from "vue";

const existingElements = [] as { id: number; class: Glitched }[];

class Glitched {
  constructor(el: HTMLElement, binding: DirectiveBinding<string>) {
    this.el = el;

    this.updateTextProperties(binding);
    this.setInnerText(this.text);

    this.jumble();
  }

  /** interval */

  interval = {
    jumble: -1,
    changeSize: -1,
    unjumble: -1,
  };

  intervalTime = () => 100 / this.jumbledText.length;

  /** jumbling */

  jumble = () => {
    this.clearAll();
    const unusedIndices = Array.from(this.jumbledText.split("").keys());
    this.interval.jumble = setInterval(() => {
      if (unusedIndices.length !== 0) {
        const newIndex = this.getIndicesIndex(unusedIndices);
        this.jumbledText = this.replaceText(
          this.jumbledText,
          this.getRandomGlitchedChar(),
          newIndex
        );
        this.setInnerText(this.jumbledText);
      } else {
        this.clearAll();
        this.changeSize();
      }
    }, this.intervalTime());
  };

  unjumble = () => {
    const unusedIndices = Array.from(this.jumbledText.split("").keys());
    this.interval.unjumble = setInterval(() => {
      if (unusedIndices.length !== 0) {
        const newIndex = this.getIndicesIndex(unusedIndices);
        this.jumbledText = this.replaceText(
          this.jumbledText,
          this.text[newIndex] ?? "",
          newIndex
        );

        this.setInnerText(this.jumbledText);
      } else {
        this.clearAll();
        clearInterval(this.interval.unjumble);
      }
    }, this.intervalTime());
  };

  /** element */

  el: HTMLElement;

  setInnerText = (text: string) => {
    this.el.innerText = text;
  };

  /** text */

  // create setters? might be overengineering
  text = "";
  jumbledText = "";
  readonly allowedUpperCase = "AGHMRVWXZaghmrvwxz".split("");
  readonly glitchedCharacters =
    "`¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?░▒▓<>/".split("");

  updateTextProperties = (binding: DirectiveBinding<string>) => {
    this.text = binding.value;
    this.jumbledText = binding.oldValue ?? binding.value;
  };

  changeSize = () => {
    this.interval.changeSize = setInterval(() => {
      const deltaIndex = this.text.length - this.jumbledText.length ?? 0;
      if (deltaIndex !== 0) {
        if (deltaIndex < 0) {
          const randomIndex = this.getRandomTextIndex(this.jumbledText);
          this.jumbledText =
            this.jumbledText.slice(0, randomIndex) +
            this.jumbledText.slice(randomIndex + 1);
        }

        if (deltaIndex > 0) {
          this.jumbledText = this.appendToText(
            this.jumbledText,
            this.getRandomGlitchedChar(),
            this.getRandomTextIndex(this.jumbledText)
          );
        }

        this.setInnerText(this.jumbledText);
      } else {
        this.clearAll();
        this.unjumble();
      }
    }, this.intervalTime());
  };

  appendToText = (text: string, newChar: string, index: number) => {
    return text.substring(0, index) + newChar + text.substring(index);
  };

  replaceText = (text: string, newChar: string, index: number) => {
    return (
      text.substring(0, index) +
      this.replaceCase(newChar)[0] +
      text.substring(index + 1)
    );
  };

  replaceCase = (text: string): string => {
    // MajorMono is a very clean font.. for the most part. This filters out ugly upper case characters.
    // TODO find a better font, since if font is not loaded correct the text would look very weird
    return text
      .split("")
      .map((char: string) => {
        let casedChar: string;
        if (this.allowedUpperCase.includes(char)) {
          casedChar = char.toUpperCase();
        } else {
          casedChar = char.toLowerCase();
        }

        return casedChar;
      })
      .join("");
  };

  getRandomGlitchedChar = () => {
    const randomIndex = Math.floor(
      Math.random() * this.glitchedCharacters.length
    );
    return this.glitchedCharacters[randomIndex];
  };

  getRandomTextIndex = (text: string) => {
    return Math.floor(Math.random() * text.length);
  };

  getIndicesIndex = (unusedIndices: number[] = []): number => {
    const indicesIndex = Math.floor(Math.random() * unusedIndices?.length);
    return unusedIndices.splice(indicesIndex, 1)[0];
  };

  /** cleanup */

  clearAll = () => {
    (Object.keys(this.interval) as Array<keyof typeof this.interval>).forEach(
      (key) => {
        const keyString = key;
        clearInterval(this.interval[keyString]);
        this.interval[keyString] = -1;
      }
    );
  };

  /** */
}

const findClass = (el: HTMLElement) => {
  const currentId = parseInt(el.dataset.vGlitchedId ?? "") as number;
  return existingElements.find((e) => {
    return e.id === currentId;
  })?.class;
};

export const vGlitched = {
  created: (el: HTMLElement, binding) => {
    const newID = Object.keys(existingElements).length + 1;
    const newClass = new Glitched(el, binding);

    el.dataset.vGlitchedId = newID.toString();

    existingElements.push({
      id: newID,
      class: newClass,
    });
  },
  beforeUpdate(el: HTMLElement, binding) {
    const currentClass = findClass(el);

    if (!currentClass || binding.value === binding.oldValue) return;
    currentClass.updateTextProperties(binding);
    currentClass.jumble();
  },
} as Directive;

import merge from "deepmerge";

class LaughAtIE {
  constructor(userOptions = {}) {
    const defaultOptions = {
      onLoad: {
        sound: "https://laugh-at-ie.netlify.com/sound/laugh.mp3",
        callback: () => {},
      },
      onError: {
        sound: "https://laugh-at-ie.netlify.com/sound/laugh2.mp3",
        callback: (e) => {
          alert("Error!\n\n" + e);
        },
      },
    };

    this.options = merge(defaultOptions, userOptions);
  }

  isIE() {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/))
        return true;
    }
    return false;
  }

  play(eventName = "onLoad", e = "") {
    if (this.options[eventName].audio.readyState === 4) {
      this.options[eventName].audio.pause();
      this.options[eventName].audio.currentTime = 0;
      this.options[eventName].audio.play();
      this.options[eventName].callback(e);
    } else {
      this.options[eventName].audio.oncanplaythrough = () => {
        this.play(eventName, e);
      };
    }
  }

  load(eventName = "onLoad") {
    this.options[eventName].audio.src = this.options[eventName].sound;
  }

  init() {
    if (!this.isIE()) return;

    this.options.onLoad.audio = new Audio();
    this.options.onError.audio = new Audio();

    // ロード時
    this.load("onLoad");
    this.play("onLoad");

    // エラー時サウンドのプリロード
    this.load("onError");

    // エラーリスナー（ロード時のエラーを無視するために遅延させる）
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.onerror = (e) => {
          this.play("onError", e);
        };
      }
    }, 500);
  }
}

export default LaughAtIE;

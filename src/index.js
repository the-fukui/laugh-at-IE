import merge from 'deepmerge'

class LaughAtIE {
    constructor(userOptions = {}) {

        const defaultOptions = {
            onLoad: {
                sound: 'https://laugh-at-ie.netlify.com/sound/laugh.mp3',
                callback: () => {}
            },
            onError: {
                sound: 'https://laugh-at-ie.netlify.com/sound/laugh.mp3',
                callback: (e) => {
                    alert('Error!\n\n' + e)
                }
            }
        }

        this.options = merge(defaultOptions, userOptions)
    }


    isIE() {
        if (typeof window !== 'undefined') {
            const userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/)) return true
        }
        return false

    }

    play(eventName = 'onLoad', e = 'onLoad') {
        const audio = new Audio()
        audio.src = this.options[eventName].sound;
        audio.addEventListener('canplay', () => {
            audio.play()
            this.options[eventName].callback(e)
        })
    }

    onError() {
        if (typeof window !== 'undefined') {
            window.onerror = e => {
                this.play('onError', e)
            }
        }
    }

    init() {
        if (!this.isIE()) return

        //ロード時
        if (this.options.onLoad) this.play('onLoad', 'onLoad')

        //エラー時（ロード時のエラーを無視するために遅延させる）
        setTimeout(() => { this.onError() }, 500)
    }
}


export default LaughAtIE
import * as Vue from './vue@3.0.11/dist/vue.esm-browser.min.js'

const options = {
  moduleCache: {
    vue: Vue
  },
  async getFile(url) {
    const res = await fetch('https://eoys-uploader-2021.glitch.me/app3/components/'+url);
    if ( !res.ok ) throw Object.assign(new Error(res.statusText + ' ' + url), { res });
    return await res.text();
  },
  addStyle(textContent) {
    const style = Object.assign(document.createElement('style'), { textContent });
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  }
}

export default options
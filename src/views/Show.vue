<template>
  <div class="page">
    <v-btn
      icon
      color="#3c40c6"
      large="true"
      ripple="false"
      active-class="backbutton"
      @click="popRoute()"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div v-if="loaded">
      <v-container>
        <span v-html="html" class="page"></span>
      </v-container>
    </div>
    <div v-else>
      <v-progress-linear indeterminate="true"></v-progress-linear>
      <div class="centermessage">
        <h4
          class="centermessage"
        >Falls diese Seite nicht lädt, überprüfe ob alle Cookies aktiviert sind.</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { CorrectionsModule } from "../store";
import { Correction } from "../store/Correction";
import Stackedit from "stackedit-js";
import { katexRender } from "../plugins/katex";

const store = getModule(CorrectionsModule);

@Component
export default class Show extends Vue {
  @Prop()
  id!: number;
  loaded = false;
  html = "";

  public get correction(): Correction | null {
    return store.corrections ? store.corrections[this.id] : null;
  }

  popRoute() {
    this.$router.go(-1);
  }

  created() {
    if (store.isLoaded) {
      this.renderMarkdown();
    }
  }

  @Watch("correction")
  onCorrectionChanged(val: Correction) {
    console.log("changed");
    if (this.correction != null) {
      this.renderMarkdown();
    }
  }

  renderMarkdown() {
    const stackedit = new Stackedit();
    stackedit.on("fileChange", file => {
      console.log("Tadaaa");
      this.html = katexRender(file.content.html);
      this.loaded = true;
    });

    stackedit.openFile(
      {
        name: "File",
        content: {
          text: this.correction!.markdown
        }
      },
      true
    );
  }
}
</script>

<style scoped>
.centermessage {
  margin: 50px auto;
  text-align: center;
}
</style>

<style module>
.backbutton {
  margin: 50px;
  padding: 50px;
}
.page {
  text-align: left;
  align-content: flex-start;
  align-items: stretch;
  align-self: flex-start;
}



@font-face {
  font-family: Lato;
  font-style: normal;
  font-weight: 400;
  src: url(/static/fonts/lato-normal.27bd77b.woff) format("woff");
}
@font-face {
  font-family: Lato;
  font-style: italic;
  font-weight: 400;
  src: url(/static/fonts/lato-normal-italic.f28f2d6.woff) format("woff");
}
@font-face {
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  src: url(/static/fonts/lato-black.f80bda6.woff) format("woff");
}
@font-face {
  font-family: Lato;
  font-style: italic;
  font-weight: 600;
  src: url(/static/fonts/lato-black-italic.798eafd.woff) format("woff");
}
@font-face {
  font-family: Roboto Mono;
  font-style: normal;
  font-weight: 400;
  src: url(/static/fonts/RobotoMono-Regular.0b6a547.woff) format("woff");
}
@font-face {
  font-family: Roboto Mono;
  font-style: normal;
  font-weight: 600;
  src: url(/static/fonts/RobotoMono-Bold.819f3b2.woff) format("woff");
}

.page html {
  line-height: 1.15;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
.page article,
.page aside,
.page footer,
.page header,
.page nav,
.page section {
  display: block;
}
.page h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
.page figcaption,
.page figure {
  display: block;
}
.page figure {
  margin: 1em 40px;
}
.page hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
.page main {
  display: block;
}
.page pre {
  font-family: monospace, monospace;
  font-size: 1em;
}
.page a {
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}
.page abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  text-decoration: underline dotted;
}
.page b,
.page strong {
  font-weight: inherit;
  font-weight: bolder;
}
.page code,
.page kbd,
.page samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
.page dfn {
  font-style: italic;
}
.page mark {
  background-color: #ff0;
  color: #000;
}
.page small {
  font-size: 80%;
}
.page sub,
.page sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
.page sub {
  bottom: -0.25em;
}
.page sup {
  top: -0.5em;
}
audio,
video {
  display: inline-block;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
img {
  border-style: none;
}
svg:not(:root) {
  overflow: hidden;
}
.page button,
.page input,
.page optgroup,
.page select,
.page textarea {
  font-family: sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
.page button {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
[type="reset"],
[type="submit"],
button,
html [type="button"] {
  -webkit-appearance: button;
}
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner,
button::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring,
button:-moz-focusring {
  outline: 1px dotted ButtonText;
}
input {
  overflow: visible;
}
[type="checkbox"],
[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
fieldset {
  padding: 0.35em 0.75em 0.625em;
}
legend {
  box-sizing: border-box;
  display: table;
  max-width: 100%;
  padding: 0;
  color: inherit;
  white-space: normal;
}
progress {
  display: inline-block;
  vertical-align: baseline;
}
.page textarea {
  overflow: auto;
}
details {
  display: block;
}
summary {
  display: list-item;
}
menu {
  display: block;
}
canvas {
  display: inline-block;
}
[hidden],
template {
  display: none;
}
body,
html {
  color: rgba(0, 0, 0, 0.75);
  font-size: 16px;
  font-family: Lato, Helvetica Neue, Helvetica, sans-serif;
  font-variant-ligatures: common-ligatures;
  line-height: 1.67;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.app--dark .layout__panel--editor,
.app--dark .layout__panel--preview {
  color: hsla(0, 0%, 100%, 0.75);
}
blockquote,
dl,
ol,
p,
pre,
ul {
  margin: 1.2em 0;
}
span > h1,
span > h2,
span > h3,
span > h4,
span > h5,
span > h6 {
  margin: 1.8em 0;
  line-height: 1.33;
}
span > h1:after,
span > h2:after {
  content: "";
  display: block;
  position: relative;
  top: 0.33em;
  border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
}
ol ol,
ol ul,
ul ol,
ul ul {
  margin: 0;
}
dt {
  font-weight: 700;
}
a {
  color: #0c93e4;
  text-decoration: underline;
  text-decoration-skip: ink;
}
a:focus,
a:hover {
  text-decoration: none;
}
code,
pre,
samp {
  font-family: Roboto Mono, Lucida Sans Typewriter, Lucida Console, monaco,
    Courrier, monospace;
  font-size: 0.85em;
}
code *,
pre *,
samp * {
  font-size: inherit;
}
blockquote {
  color: rgba(0, 0, 0, 0.5);
  padding-left: 1.5em;
  border-left: 5px solid rgba(0, 0, 0, 0.1);
}
.app--dark .layout__panel--editor blockquote,
.app--dark .layout__panel--preview blockquote {
  color: hsla(0, 0%, 100%, 0.4);
  border-left-color: hsla(0, 0%, 100%, 0.1);
}
code {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  padding: 2px 4px;
}
hr {
  border: 0;
  border-top: 1px solid hsla(0, 0%, 50%, 0.33);
  margin: 2em 0;
}
pre > code {
  background-color: rgba(0, 0, 0, 0.05);
  display: block;
  padding: 0.5em;
  -webkit-text-size-adjust: none;
  overflow-x: auto;
  white-space: pre;
}
.toc ul {
  list-style-type: none;
  padding-left: 20px;
}
table {
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
}
td,
th {
  border-right: 1px solid #dcdcdc;
  padding: 8px 12px;
}
td:last-child,
th:last-child {
  border-right: 0;
}
td {
  border-top: 1px solid #dcdcdc;
}
mark {
  background-color: #f8f840;
}
kbd {
  font-family: Lato, Helvetica Neue, Helvetica, sans-serif;
  background-color: #fff;
  border: 1px solid rgba(63, 63, 63, 0.25);
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(63, 63, 63, 0.25);
  color: #333;
  display: inline-block;
  font-size: 0.8em;
  margin: 0 0.1em;
  padding: 0.1em 0.6em;
  white-space: nowrap;
}
abbr[title] {
  border-bottom: 1px dotted #777;
  cursor: help;
}
img {
  max-width: 100%;
}
.task-list-item {
  list-style-type: none;
}
.task-list-item-checkbox {
  margin: 0 0.2em 0 -1.3em;
}
.footnote {
  font-size: 0.8em;
  position: relative;
  top: -0.25em;
  vertical-align: top;
}
.page-break-after {
  page-break-after: always;
}
.abc-notation-block {
  overflow-x: auto !important;
}
.stackedit__html {
  margin-bottom: 180px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
  max-width: 750px;
}
.stackedit__toc ul {
  padding: 0;
}
.stackedit__toc ul a {
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
}
.stackedit__toc ul ul {
  color: #888;
  font-size: 0.9em;
}
.stackedit__toc ul ul a {
  margin: 0;
  padding: 0.1rem 1rem;
}
.stackedit__toc li {
  display: block;
}
.stackedit__toc a {
  display: block;
  color: inherit;
  text-decoration: none;
}
.stackedit__toc a:active,
.stackedit__toc a:focus,
.stackedit__toc a:hover {
  background-color: rgba(0, 0, 0, 0.075);
  border-radius: 3px;
}
.stackedit__left {
  position: fixed;
  display: none;
  width: 250px;
  height: 100%;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
}
@media (min-width: 1060px) {
  .stackedit__left {
    display: block;
  }
}
.stackedit__right {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
}
@media (min-width: 1060px) {
  .stackedit__right {
    left: 250px;
  }
}
.stackedit--pdf blockquote {
  border-left-color: #ececec;
}
.stackedit--pdf .stackedit__html {
  padding-left: 0;
  padding-right: 0;
  max-width: none;
}
</style>

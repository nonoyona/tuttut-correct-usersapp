import "katex/dist/katex.min.css";
import Vue from "vue";
import VueKatex from "vue-katex";
import "katex/dist/katex.min.css";
import katex from "katex";

Vue.use(VueKatex, {
    globalOptions: {
        //... Define globally applied KaTeX options here
    },
});

export function katexRender(output: string) {
    console.log("halp");
    const doc = new DOMParser().parseFromString(output, "text/html");
    doc.write(output);
    console.log("HTML:");
    console.log(doc.body.parentElement!.innerHTML);
    const katexElements = doc.querySelectorAll('span[class^="katex--"]');
    const katexElementsArrLen = katexElements.length;

    if (katexElementsArrLen > 0) {
        for (let i = katexElementsArrLen - 1; i >= 0; i--) {
            const currElement = katexElements[i];
            const katexDefinition = currElement.textContent;

            try {
                console.log(currElement.innerHTML);
                const katexHTML = katex.renderToString(katexDefinition!, {
                    displayMode: currElement.className == "katex--display",
                });
                console.log(katexHTML);
                currElement.insertAdjacentHTML("beforebegin", katexHTML);
                currElement.remove();
            } catch (err) {
                // Catch mermaid 'parseError'
                alert(err);
            }
        }
    }
    return doc.body.parentElement!.innerHTML;
}

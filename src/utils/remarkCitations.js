// src/utils/remarkCitations.js
//
// Remark-plugin, joka tekee tekstin lähdeviitteistä [1], [2, 3] klikattavia
// ja pienentää niiden kokoa (yläindeksi) kuten Wikipediassa.
//
// Toimintaperiaate:
// 1. Etsii "Lähteet"-otsikon (tai Sources / References / Viitteet / Lähdeluettelo)
//    ja tunnistaa sen alta lähteet, jotka alkavat merkinnällä [n] tai ovat
//    numeroidun listan kohtia. Jokaiselle lähteelle annetaan id="ref-n".
// 2. Muuttaa muun tekstin [n]-merkinnät linkeiksi (#ref-n) pienellä yläindeksillä.
//    Vain numerot, joille löytyy lähde, muutetaan, joten esim. taulukko[1] ei muutu.
// 3. Lähteen numerosta (tai ↑-merkistä) pääsee takaisin viittauksen kohtaan (#cite-n).
//
// Tailwind-luokat on kirjoitettu tähän kokonaisina merkkijonoina; varmista, että
// tailwind.config.js:n content-polku kattaa tämän tiedoston (esim. "./src/**/*.{js,jsx}").

const REF_HEADING =
  /^(lähteet|lähdeluettelo|viitteet|sources|references|bibliography)\s*:?$/i;
const LABEL = /^\s*\[(\d+)\]\s*/;
// [7]  [7, 10]  [7][10]  [3–5]
const CITE_SRC = "\\[(\\d+(?:\\s*[,–-]\\s*\\d+)*)\\]";

const SUP_CLASS = [
  "text-[0.7em]",
  "font-sans",
  "font-semibold",
  "whitespace-nowrap",
];
const CITE_CLASS = [
  "text-purple-700",
  "no-underline",
  "hover:underline",
  "transition-colors",
  "duration-700",
  "rounded-sm",
];
const BACKLINK_CLASS = [
  "font-sans",
  "font-semibold",
  "text-purple-700",
  "no-underline",
  "hover:underline",
];
const REF_CLASS = [
  "scroll-mt-24",
  "rounded",
  "transition-colors",
  "duration-700",
];

const SKIP_TYPES = new Set([
  "code",
  "inlineCode",
  "link",
  "linkReference",
  "definition",
  "html",
  "heading",
]);

const toText = (n) =>
  n.value ?? (n.children ? n.children.map(toText).join("") : "");

function setProps(node, props) {
  node.data = {
    ...(node.data || {}),
    hProperties: { ...(node.data?.hProperties || {}), ...props },
  };
}

function makeLink(url, label, classes, extra = {}) {
  return {
    type: "link",
    url,
    title: null,
    children: [{ type: "text", value: label }],
    data: { hProperties: { className: classes, ...extra } },
  };
}

// Jakaa kappaleen riveihin (pehmeä rivinvaihto tai break), jotta jokainen
// "[n] lähde" -rivi saa oman ankkurinsa.
function splitParagraph(par) {
  const groups = [[]];
  for (const child of par.children) {
    if (child.type === "break") {
      groups.push([]);
    } else if (child.type === "text" && child.value.includes("\n")) {
      child.value.split("\n").forEach((part, i) => {
        if (i > 0) groups.push([]);
        if (part) groups[groups.length - 1].push({ type: "text", value: part });
      });
    } else {
      groups[groups.length - 1].push(child);
    }
  }
  return groups
    .filter((g) => g.length)
    .map((children) => ({ type: "paragraph", children }));
}

function leadingLabel(par) {
  const first = par.children?.[0];
  if (first?.type !== "text") return null;
  const m = LABEL.exec(first.value);
  return m ? { n: Number(m[1]), len: m[0].length } : null;
}

function citeLink(n, label, cited) {
  const extra = cited.has(n) ? {} : { id: `cite-${n}` }; // id vain ensimmäiselle viittaukselle
  cited.add(n);
  return makeLink(`#ref-${n}`, label, CITE_CLASS, extra);
}

function buildCitation(inner, refs, cited) {
  const nums = inner.match(/\d+/g).map(Number);
  let children;

  if (nums.length === 1) {
    // Yksi viite: koko "[7]" on klikattava
    children = [citeLink(nums[0], `[${nums[0]}]`, cited)];
  } else {
    // Ryhmä: "[" + linkit + "]"
    children = [{ type: "text", value: "[" }];
    inner.split(/(\d+)/).forEach((part) => {
      if (!part) return;
      if (/^\d+$/.test(part) && refs.has(Number(part))) {
        children.push(citeLink(Number(part), part, cited));
      } else {
        children.push({ type: "text", value: part });
      }
    });
    children.push({ type: "text", value: "]" });
  }

  return {
    type: "emphasis", // renderöidään <sup>-elementiksi
    data: { hName: "sup", hProperties: { className: SUP_CLASS } },
    children,
  };
}

function convertText(node, refs, cited) {
  const text = node.value;
  const re = new RegExp(CITE_SRC, "g");
  const out = [];
  let last = 0;
  let m;

  while ((m = re.exec(text))) {
    const nums = m[1].match(/\d+/g).map(Number);
    if (!nums.some((n) => refs.has(n))) continue;
    if (m.index > last)
      out.push({ type: "text", value: text.slice(last, m.index) });
    out.push(buildCitation(m[1], refs, cited));
    last = m.index + m[0].length;
  }

  if (!out.length) return [node];
  if (last < text.length) out.push({ type: "text", value: text.slice(last) });
  return out;
}

function convertChildren(parent, refs, cited) {
  if (!parent.children || SKIP_TYPES.has(parent.type)) return;
  const out = [];
  for (const child of parent.children) {
    if (child.type === "text") {
      out.push(...convertText(child, refs, cited));
    } else {
      convertChildren(child, refs, cited);
      out.push(child);
    }
  }
  parent.children = out;
}

export default function remarkCitations() {
  return (tree) => {
    const kids = tree.children;
    const start = kids.findIndex(
      (n) => n.type === "heading" && REF_HEADING.test(toText(n).trim()),
    );
    if (start === -1) return; // ei lähdeosiota -> ei tehdä mitään

    const depth = kids[start].depth;
    let end = kids.length;
    for (let i = start + 1; i < kids.length; i++) {
      if (kids[i].type === "heading" && kids[i].depth <= depth) {
        end = i;
        break;
      }
    }

    // 1) Lähteet: anna ankkurit (id="ref-n")
    const refs = new Map();
    const section = [];
    for (const node of kids.slice(start + 1, end)) {
      if (node.type === "paragraph") section.push(...splitParagraph(node));
      else section.push(node);
    }

    for (const node of section) {
      if (node.type === "list") {
        const base = node.start ?? 1;
        node.children.forEach((item, i) => {
          const par = item.children?.find((c) => c.type === "paragraph");
          if (!par) return;
          const label = leadingLabel(par);
          const n = label ? label.n : node.ordered ? base + i : null;
          if (n == null || refs.has(n)) return;
          setProps(item, { id: `ref-${n}`, className: REF_CLASS });
          refs.set(n, { par, label });
        });
      } else if (node.type === "paragraph") {
        const label = leadingLabel(node);
        if (!label || refs.has(label.n)) continue;
        setProps(node, { id: `ref-${label.n}`, className: REF_CLASS });
        refs.set(label.n, { par: node, label });
      }
    }

    if (refs.size === 0) return;

    kids.splice(start + 1, end - start - 1, ...section);
    const sectionEnd = start + 1 + section.length;

    // 2) Teksti: [n] -> klikattava yläindeksi
    const cited = new Set();
    const body = [...kids.slice(0, start + 1), ...kids.slice(sectionEnd)];
    body.forEach((node) => convertChildren(node, refs, cited));

    // 3) Paluulinkit lähteistä viittauksen kohtaan
    for (const [n, { par, label }] of refs) {
      if (!cited.has(n)) continue;
      if (label) {
        const first = par.children[0];
        first.value = first.value.slice(label.len);
        par.children.unshift(makeLink(`#cite-${n}`, `[${n}]`, BACKLINK_CLASS), {
          type: "text",
          value: " ",
        });
      } else {
        par.children.push(
          { type: "text", value: " " },
          makeLink(`#cite-${n}`, "↑", BACKLINK_CLASS),
        );
      }
    }
  };
}

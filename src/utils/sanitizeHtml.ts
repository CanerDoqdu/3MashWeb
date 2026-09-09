const ALLOWED_TAGS = new Set([
  "a",
  "address",
  "article",
  "aside",
  "b",
  "blockquote",
  "br",
  "circle",
  "defs",
  "details",
  "dialog",
  "div",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "g",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "i",
  "img",
  "label",
  "legend",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "path",
  "rect",
  "s",
  "section",
  "small",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
  "use",
]);

const FORBIDDEN_TAGS = new Set([
  "script",
  "iframe",
  "object",
  "embed",
  "foreignobject",
  "math",
  "noscript",
  "form",
  "input",
  "button",
  "textarea",
  "select",
  "option",
  "meta",
  "link",
  "base",
  "style",
]);

const FORBIDDEN_ATTRS = new Set([
  "srcdoc",
  "xmlns",
  "style",
]);

function sanitizeAttributes(element: Element) {
  Array.from(element.attributes).forEach((attribute) => {
    const name = attribute.name.toLowerCase();
    const value = attribute.value;

    // Remove all event handlers (on*), data attributes, and forbidden attributes
    if (name.startsWith("on") || FORBIDDEN_ATTRS.has(name) || name.startsWith("data-")) {
      element.removeAttribute(attribute.name);
      return;
    }

    // Block javascript: and data: URIs in href/src/xlink:href
    if ((name === "href" || name === "src" || name === "xlink:href") && isUnsafeUrlValue(value)) {
      element.removeAttribute(attribute.name);
      return;
    }

    if (name === "target" && !["_blank", "_self"].includes(value.trim().toLowerCase())) {
      element.removeAttribute(attribute.name);
    }
  });
}

function isUnsafeUrlValue(value: string) {
  const normalized = value.trim().replace(/[\u0000-\u0020]+/g, "");
  return /^(?:javascript:|vbscript:|data:)/i.test(normalized);
}

function stripUnsafeUrlAttributes(input: string, blockAllData = false) {
  return input.replace(
    /\s(?:href|src|xlink:href)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,
    (attribute) => {
      const value = attribute.replace(/^\s*(?:href|src|xlink:href)\s*=\s*/i, "").trim();
      const unquoted = value.replace(/^("|')|("|')$/g, "").trim();
      return isUnsafeUrlValue(unquoted) ? "" : attribute;
    },
  );
}

function stripForbiddenTags(input: string) {
  const forbiddenTags = Array.from(FORBIDDEN_TAGS).join("|");
  const block = new RegExp(`<(${forbiddenTags})\\b[^>]*>[\\s\\S]*?<\\/\\1\\s*>`, "gi");
  const selfClosing = new RegExp(`<(${forbiddenTags})\\b[^>]*\\/?>`, "gi");
  let result = input;
  for (let i = 0; i < 10; i++) {
    const next = result.replace(block, "").replace(selfClosing, "");
    if (next === result) break;
    result = next;
  }
  return result;
}

function stripUnsafeAttributes(input: string) {
  return input
    .replace(/\s(?:on[\w:-]+|style|srcdoc|xmlns|data-[\w:-]+)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(?:href|src|xlink:href)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, (attribute) => {
      const value = attribute.replace(/^\s*[^=]+\s*=\s*/i, "").replace(/^("|')|("|')$/g, "").trim();
      return isUnsafeUrlValue(value) ? "" : attribute;
    });
}

export function sanitizeHtml(input?: string | null): string {
  if (!input) return "";

  if (typeof DOMParser === "undefined") {
    return stripUnsafeUrlAttributes(
      stripUnsafeAttributes(
        stripForbiddenTags(String(input)),
      ),
    );
  }

  const doc = new DOMParser().parseFromString(`<div>${String(input)}</div>`, "text/html");
  const container = doc.body.firstElementChild as HTMLElement | null;
  if (!container) return "";

  container.querySelectorAll("*").forEach((element) => {
    const tag = element.tagName.toLowerCase();
    if (!ALLOWED_TAGS.has(tag) || FORBIDDEN_TAGS.has(tag)) {
      const textOnly = document.createTextNode(element.textContent ?? "");
      element.replaceWith(textOnly);
      return;
    }

    sanitizeAttributes(element);
  });

  return container.innerHTML;
}

export function safeJsonLdScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function sanitizeSvgMarkup(input: string | null | undefined): string {
  if (!input) return "";

  const svg = input.trim();
  if (!svg) return "";

  if (typeof DOMParser === "undefined") {
    return stripUnsafeUrlAttributes(
      svg
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
        .replace(/on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
        .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, ""),
      true,
    );
  }

  const doc = new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${svg}</svg>`, "image/svg+xml");
  const root = doc.documentElement;
  if (!root || doc.querySelector("parsererror")) {
    return "";
  }

  root.querySelectorAll("script, iframe, foreignObject, object, embed, meta, link, style").forEach((node) => node.remove());
  root.querySelectorAll("*").forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      if (name.startsWith("on") || name === "style" || name.startsWith("data-") || name === "href" || name === "xlink:href") {
        const value = attribute.value.trim();
        if (name === "href" || name === "xlink:href") {
          if (/^(?:javascript:|vbscript:|data:)/i.test(value)) {
            element.removeAttribute(attribute.name);
            return;
          }
        }
        element.removeAttribute(attribute.name);
      }
    });
  });

  return root.innerHTML;
}

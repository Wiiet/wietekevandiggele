import { HtmlBasePlugin } from "@11ty/eleventy";

// Foto's staan als WebP in src/assets/img als <naam>-<breedte>.webp.
// ratio = hoogte / breedte van de originele foto (voorkomt verspringende pagina's).
const images = {
  "wiet-croc": { widths: [640, 1100], ratio: 1802 / 1365 },
  "wiet-discovloer": { widths: [640, 1100], ratio: 2048 / 1365 },
  "wiet-lach": { widths: [640, 1080], ratio: 1920 / 1080 },
  "wiet-discoballen": { widths: [640, 1080], ratio: 1920 / 1080 },
  "wiet-hengel": { widths: [640, 1100], ratio: 2048 / 1365 },
  "wiet-liggend": { widths: [640, 1100], ratio: 2048 / 1365 },
  "wiet-zilver": { widths: [640, 1100], ratio: 2876 / 1920 },
  "wiet-wijst": { widths: [1024], ratio: 683 / 1024 },
  "wiet-tule": { widths: [1024], ratio: 663 / 1024 },
  "kop-van-wiet": { widths: [480, 960], ratio: 1398 / 1920 },
  "wiet-avatar": { widths: [320], ratio: 1 },
};

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // {% img "wiet-croc", "Alt-tekst", "(min-width: 960px) 40vw, 100vw", "eager" %}
  eleventyConfig.addShortcode("img", (name, alt, sizes = "100vw", opts = "", cls = "") => {
    const im = images[name];
    if (!im) throw new Error(`Onbekende foto: ${name}`);
    const largest = im.widths[im.widths.length - 1];
    const srcset = im.widths.map((w) => `/assets/img/${name}-${w}.webp ${w}w`).join(", ");
    const height = Math.round(largest * im.ratio);
    const loading = opts.includes("eager") ? 'fetchpriority="high"' : 'loading="lazy"';
    const klass = cls ? ` class="${cls}"` : "";
    return `<img${klass} src="/assets/img/${name}-${largest}.webp" srcset="${srcset}" sizes="${sizes}" width="${largest}" height="${height}" alt="${alt}" ${loading} decoding="async">`;
  });

  // Maakt een mailto-link met onderwerp en (optioneel) een invul-sjabloon.
  eleventyConfig.addFilter("mailto", (email, subject = "", body = "") => {
    const params = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    return `mailto:${email}${params.length ? "?" + params.join("&") : ""}`;
  });

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}

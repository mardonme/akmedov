/**
 * Renders an optimized, WebP-first <picture> for an image that has been
 * processed by scripts/optimize-images.mjs into /images/opt/.
 *
 * Pass the ORIGINAL public path (e.g. "/images/eskimo1.png"); the component
 * maps it to the matching opt/ derivatives. Modern browsers get the WebP
 * <source>; older ones fall back to the resized PNG/JPEG <img>.
 *
 *   widths   array of generated widths (descending) -> emits a srcset; pair
 *            with `sizes`. Omit for a single fixed-size image.
 *   eager    load immediately (loading="eager") instead of lazy.
 *   priority hint the browser this is high priority (fetchpriority="high").
 */
const OPT_BASE = "/images/opt/";

const parseSrc = (src) => {
  const file = src.replace(/^.*\/images\//, "");
  const dot = file.lastIndexOf(".");
  const name = file.slice(0, dot);
  const ext = file.slice(dot + 1).toLowerCase();
  // Normalize to the same fallback extension the build script writes.
  const fallbackExt = ext === "jpeg" || ext === "jpg" ? "jpg" : "png";
  return { name, fallbackExt };
};

const OptImage = ({
  src,
  alt = "",
  className,
  widths,
  sizes,
  eager = false,
  priority = false,
  ...rest
}) => {
  const { name, fallbackExt } = parseSrc(src);
  const base = OPT_BASE + name;
  const loading = eager ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : undefined;

  // Derivatives are named <stem>.<origExt>[.webp]; for responsive variants a
  // -<width> is inserted before the extension. This mirrors optimize-images.mjs.
  const fixed = `${base}.${fallbackExt}`;
  const variant = (w) => `${base}-${w}.${fallbackExt}`;

  const hasSet = Array.isArray(widths) && widths.length > 0;
  const webpSrcSet = hasSet
    ? widths.map((w) => `${variant(w)}.webp ${w}w`).join(", ")
    : `${fixed}.webp`;
  const fallbackSrcSet = hasSet
    ? widths.map((w) => `${variant(w)} ${w}w`).join(", ")
    : undefined;
  const fallbackSrc = hasSet ? variant(widths[0]) : fixed;

  return (
    <picture>
      <source type="image/webp" srcSet={webpSrcSet} sizes={hasSet ? sizes : undefined} />
      <img
        src={fallbackSrc}
        srcSet={fallbackSrcSet}
        sizes={hasSet ? sizes : undefined}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        {...rest}
      />
    </picture>
  );
};

export default OptImage;

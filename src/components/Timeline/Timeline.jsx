import { useCallback, useLayoutEffect, useRef, useState } from "react";
import "./Timeline.scss";

/**
 * Horizontal milestone rail: a year on the axis, a dot on it, a card under it.
 *
 * The scroll position is measured so the rail can fade out only the edge that
 * still has content behind it — otherwise a half-scrolled card ends in a hard
 * vertical cut mid-sentence, with nothing to say the list continues.
 *
 * `items` is `[{ year, text }]` (see `timelineHighlights` in constants/history).
 */
const Timeline = ({ items, label = "Хронология компании" }) => {
  const viewportRef = useRef(null);
  const [clipped, setClipped] = useState({ start: false, end: false });

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setClipped({
      // 1px of slack: sub-pixel layout means scrollLeft rarely lands on `max`
      // exactly, which would leave the trailing edge faded at the very end.
      start: el.scrollLeft > 1,
      end: el.scrollLeft < max - 1,
    });
  }, []);

  // Layout effect, not a plain effect: the first measure has to land before
  // paint, or the rail shows the wrong edge faded for a frame.
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;

    measure();
    el.addEventListener("scroll", measure, { passive: true });
    // Card width is a clamp() of the viewport, so a resize changes how much is
    // scrollable — re-measure instead of caching.
    const observer = new ResizeObserver(measure);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  return (
    <div className="timeline">
      <div
        ref={viewportRef}
        className={[
          "timeline__viewport",
          clipped.start ? "is-clipped-start" : "",
          clipped.end ? "is-clipped-end" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        role="region"
        aria-label={label}
        // A scrollable region has to be reachable by keyboard, or arrow-key
        // users simply cannot get to the later milestones.
        tabIndex={0}
      >
        <ol className="timeline__track">
          {items.map((item) => (
            <li key={item.year} className="timeline__item">
              <time className="timeline__year" dateTime={item.year}>
                {item.year}
              </time>
              <span className="timeline__marker" aria-hidden="true" />
              <p className="timeline__card">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Timeline;

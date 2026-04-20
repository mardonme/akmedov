import { memo, useCallback, useRef, useState } from "react";

const FAQItem = memo(({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={toggleOpen}
        aria-expanded={open}
      >
        {question}
        <span className="faq-icon" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        ref={contentRef}
        className={`faq-answer ${open ? "open" : ""}`}
        style={{ height: open ? contentRef.current?.scrollHeight : 0 }}
      >
        <div className="faq-answer-inner">{answer}</div>
      </div>
    </div>
  );
});

FAQItem.displayName = "FAQItem";

export default FAQItem;

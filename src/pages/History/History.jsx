import FAQItem from "../../components/FAQItem/FAQItem";
import { historyTimeline } from "../../constants/history";
import "./History.scss";

const History = () => (
  <div className="faq-container">
    <h2 className="faq-title">История компании</h2>
    {historyTimeline.map((item) => (
      <FAQItem
        key={item.question}
        question={item.question}
        answer={item.answer}
      />
    ))}
  </div>
);

export default History;

import { DAYS, getSlots } from "../../utils/delivery";
import "./TimeSlotPicker.scss";

/**
 * Day tabs + delivery windows. A window closes `zone.leadTimeMin` before it
 * starts, so late in the day "Сегодня" can have nothing left — the tab is then
 * disabled rather than hidden, so the customer understands why.
 */
const TimeSlotPicker = ({ zone, dayOffset, slotId, onChange, now, error }) => {
  if (!zone) {
    return <p className="slotpicker__empty">Сначала выберите город доставки.</p>;
  }

  const days = DAYS.map((day) => {
    const slots = getSlots(zone, day.offset, now);
    return { ...day, slots, enabled: slots.some((slot) => slot.available) };
  });

  const activeDay = days.find((day) => day.offset === dayOffset) ?? days[0];

  return (
    <div className="slotpicker">
      <div className="slotpicker__days" role="tablist">
        {days.map((day) => (
          <button
            key={day.offset}
            type="button"
            role="tab"
            aria-selected={day.offset === dayOffset}
            disabled={!day.enabled}
            className={`slotpicker__day ${day.offset === dayOffset ? "is-active" : ""}`}
            onClick={() => onChange({ dayOffset: day.offset, slotId: "" })}
          >
            {day.label}
            {!day.enabled && <span className="slotpicker__day-note">нет окон</span>}
          </button>
        ))}
      </div>

      <div className="slotpicker__slots">
        {activeDay.slots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            disabled={!slot.available}
            className={`slotpicker__slot ${slot.id === slotId ? "is-active" : ""}`}
            onClick={() => onChange({ dayOffset: activeDay.offset, slotId: slot.id })}
          >
            {slot.label}
          </button>
        ))}
      </div>

      {error && <p className="slotpicker__error">{error}</p>}
    </div>
  );
};

export default TimeSlotPicker;

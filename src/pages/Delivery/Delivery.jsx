import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AddressForm from "../../components/AddressForm/AddressForm";
import TimeSlotPicker from "../../components/TimeSlotPicker/TimeSlotPicker";
import FormField from "../../components/FormField/FormField";
import { submitDeliveryOrder, submitOrderFallback } from "../../api/order";
import { catalogDownloads } from "../../constants/products";
import { contactInfo } from "../../constants/contacts";
import { deliveryZones, paymentNote } from "../../constants/delivery";
import { isMapAvailable } from "../../utils/maps";
import {
  DAYS,
  findSlot,
  formatPhone,
  getSlots,
  getZone,
  hasSlotsToday,
  loadProfile,
  saveProfile,
  tashkentNow,
  validateOrder,
  workingHoursLabel,
} from "../../utils/delivery";
import "./Delivery.scss";

// Only mounted once the customer asks for it, so the Yandex bundle never costs
// anything to the visitors who type their address.
const MapPicker = lazy(() => import("../../components/MapPicker/MapPicker"));

const ORDER_PLACEHOLDER = `Например:
Пломбир 1 кг — 2 шт
Эскимо «Прага» — 5 шт
Сырки в тёмной глазури — 1 упаковка`;

/** Fields worth remembering for the next order. Never the order text itself. */
const PROFILE_FIELDS = [
  "name",
  "phone",
  "zoneId",
  "district",
  "street",
  "house",
  "flat",
  "landmark",
  "lat",
  "lng",
];

const emptyValues = {
  zoneId: deliveryZones.length === 1 ? deliveryZones[0].id : "",
  district: "",
  street: "",
  house: "",
  flat: "",
  landmark: "",
  lat: null,
  lng: null,
  dayOffset: 0,
  slotId: "",
  order: "",
  name: "",
  phone: "",
  comment: "",
  changeFrom: "",
};

const pickProfile = (values) =>
  PROFILE_FIELDS.reduce((acc, field) => ({ ...acc, [field]: values[field] }), {});

const Delivery = () => {
  const [values, setValues] = useState(() => {
    const saved = loadProfile();
    return saved ? { ...emptyValues, ...pickProfile({ ...emptyValues, ...saved }) } : emptyValues;
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [orderNumber, setOrderNumber] = useState("");
  const [mapOpen, setMapOpen] = useState(false);

  // Slot availability moves with the clock, so a form left open must not offer
  // a window that has since closed.
  const [now, setNow] = useState(() => tashkentNow());
  useEffect(() => {
    const id = setInterval(() => setNow(tashkentNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  const zone = useMemo(() => getZone(values.zoneId), [values.zoneId]);
  const change = (patch) => setValues((prev) => ({ ...prev, ...patch }));

  // Keep day/slot honest: drop a slot that just expired, and move off a day
  // that has nothing left.
  useEffect(() => {
    if (!zone) return;
    const slots = getSlots(zone, values.dayOffset, now);
    if (slots.some((slot) => slot.available)) {
      if (values.slotId && !slots.find((slot) => slot.id === values.slotId)?.available) {
        setValues((prev) => ({ ...prev, slotId: "" }));
      }
      return;
    }
    const nextDay = DAYS.find((day) =>
      getSlots(zone, day.offset, now).some((slot) => slot.available)
    );
    if (nextDay) setValues((prev) => ({ ...prev, dayOffset: nextDay.offset, slotId: "" }));
  }, [zone, values.dayOffset, values.slotId, now]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validateOrder(values, tashkentNow());
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document
        .querySelector(".has-error, .slotpicker__error")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");
    const payload = { ...values, hp: event.target.hp?.value ?? "" };

    try {
      const data = await submitDeliveryOrder(payload);
      saveProfile(pickProfile(values));
      setOrderNumber(data.number);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } catch (error) {
      // The server re-validates; surface its verdict instead of a generic error.
      const serverErrors = error.response?.data?.errors;
      if (error.response?.status === 400 && serverErrors) {
        setErrors(serverErrors);
        setStatus("idle");
        return;
      }
      if (error.response?.status === 429) {
        setStatus("throttled");
        return;
      }
    }

    // /api/order is unreachable or Telegram is down — push the order through
    // the contact endpoint so it still reaches someone.
    try {
      await submitOrderFallback(values);
      saveProfile(pickProfile(values));
      setStatus("fallback");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success" || status === "fallback") {
    const slot = findSlot(values.slotId);
    const day = DAYS.find((item) => item.offset === values.dayOffset);
    return (
      <section className="delivery">
        <div className="container delivery__done" data-aos="zoom-in">
          <i className="bx bx-check-circle delivery__done-icon" />
          <h1>Заказ принят</h1>
          {status === "success" ? (
            <>
              <p className="delivery__done-number">{orderNumber}</p>
              <p>
                Привезём {day?.label.toLowerCase()} в {slot?.label}. Оператор перезвонит,
                подтвердит состав заказа и назовёт сумму.
              </p>
            </>
          ) : (
            <p>
              Заказ отправлен резервным каналом. Пожалуйста, позвоните нам, чтобы мы
              подтвердили его быстрее:{" "}
              <a href={contactInfo.phones.header.href}>{contactInfo.phones.header.label}</a>
            </p>
          )}
          <div className="delivery__done-actions">
            <button type="button" onClick={() => { setStatus("idle"); setValues((prev) => ({ ...prev, order: "", comment: "", changeFrom: "", slotId: "" })); }}>
              Сделать ещё заказ
            </button>
            <Link to="/">На главную</Link>
          </div>
        </div>
      </section>
    );
  }

  const submitting = status === "submitting";

  return (
    <section className="delivery">
      <div className="container">
        <header className="delivery__hero" data-aos="fade-right">
          <h1>Доставка мороженого на дом</h1>
          <p>
            Оставьте заявку — оператор перезвонит, подтвердит состав заказа и назовёт
            сумму. Оплата наличными курьеру.
          </p>
        </header>

        <form className="delivery__form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot: hidden from people, irresistible to bots. */}
          <input
            type="text"
            name="hp"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="delivery__hp"
          />

          <fieldset className="delivery__step" data-aos="fade-up">
            <legend>
              <span className="delivery__step-num">1</span> Куда привезти
            </legend>
            <AddressForm
              values={values}
              errors={errors}
              zone={zone}
              mapEnabled={isMapAvailable()}
              onChange={change}
              onOpenMap={() => setMapOpen(true)}
            />
          </fieldset>

          <fieldset className="delivery__step" data-aos="fade-up">
            <legend>
              <span className="delivery__step-num">2</span> Когда привезти
            </legend>
            {zone && !hasSlotsToday(zone, now) && (
              <p className="delivery__closed">
                На сегодня доставка уже закрыта. Выберите «Завтра» — оператор
                перезвонит в рабочее время ({workingHoursLabel()}).
              </p>
            )}
            <TimeSlotPicker
              zone={zone}
              dayOffset={values.dayOffset}
              slotId={values.slotId}
              now={now}
              error={errors.slotId ?? errors.dayOffset}
              onChange={change}
            />
          </fieldset>

          <fieldset className="delivery__step" data-aos="fade-up">
            <legend>
              <span className="delivery__step-num">3</span> Что привезти
            </legend>
            <FormField
              label="Список товаров"
              name="order"
              as="textarea"
              rows={6}
              required
              maxLength={2000}
              placeholder={ORDER_PLACEHOLDER}
              value={values.order}
              error={errors.order}
              onChange={(event) => change({ order: event.target.value })}
            />
            <div className="delivery__catalog-links">
              <i className="bx bx-book-open" />
              <span>Не знаете, что выбрать?</span>
              <Link to="/catalog/icecream">Мороженое</Link>
              <Link to="/catalog/syroki">Творожные сырки</Link>
              {catalogDownloads.map(({ href, file, label }) => (
                <a key={file} href={href} download={file}>
                  {label} (PDF)
                </a>
              ))}
            </div>
          </fieldset>

          <fieldset className="delivery__step" data-aos="fade-up">
            <legend>
              <span className="delivery__step-num">4</span> Контакты
            </legend>
            <div className="delivery__contacts">
              <FormField
                label="Имя"
                name="name"
                required
                maxLength={80}
                placeholder="Как к вам обращаться"
                value={values.name}
                error={errors.name}
                onChange={(event) => change({ name: event.target.value })}
              />
              <FormField
                label="Телефон"
                name="phone"
                type="tel"
                inputMode="numeric"
                required
                placeholder="+998 90 123-45-67"
                value={values.phone}
                error={errors.phone}
                onChange={(event) => {
                  const raw = event.target.value;
                  change({ phone: raw.replace(/\D/g, "") ? formatPhone(raw) : "" });
                }}
              />
              <FormField
                label="Комментарий"
                name="comment"
                maxLength={400}
                placeholder="Позвонить за 10 минут"
                value={values.comment}
                onChange={(event) => change({ comment: event.target.value })}
              />
              <FormField
                label="Сдача с"
                name="changeFrom"
                maxLength={20}
                hint="Чтобы курьер взял размен"
                placeholder="100 000"
                value={values.changeFrom}
                onChange={(event) => change({ changeFrom: event.target.value })}
              />
            </div>
            <p className="delivery__payment">
              <i className="bx bx-money" /> {paymentNote}
            </p>
          </fieldset>

          {status === "throttled" && (
            <p className="delivery__alert">
              Слишком много заявок подряд. Подождите минуту или позвоните:{" "}
              <a href={contactInfo.phones.header.href}>{contactInfo.phones.header.label}</a>
            </p>
          )}
          {status === "error" && (
            <p className="delivery__alert">
              Не удалось отправить заказ. Позвоните нам, пожалуйста:{" "}
              <a href={contactInfo.phones.header.href}>{contactInfo.phones.header.label}</a>
            </p>
          )}

          <button type="submit" className="delivery__submit" disabled={submitting}>
            {submitting ? "Отправляем…" : "Оформить заказ"}
          </button>
          <p className="delivery__note">
            Оператор перезвонит и подтвердит сумму до выезда курьера.
          </p>
        </form>
      </div>

      {mapOpen && (
        <Suspense fallback={null}>
          <MapPicker
            zone={zone}
            value={{ lat: values.lat, lng: values.lng }}
            onClose={() => setMapOpen(false)}
            onPick={({ lat, lng, street, house }) => {
              change({
                lat,
                lng,
                // Only fill blanks — never overwrite what the customer typed.
                street: values.street || street,
                house: values.house || house,
              });
              setMapOpen(false);
            }}
          />
        </Suspense>
      )}
    </section>
  );
};

export default Delivery;

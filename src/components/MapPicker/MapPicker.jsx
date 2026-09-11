import { useEffect, useRef, useState } from "react";
import { YANDEX_MAPS_KEY } from "../../utils/maps";
import "./MapPicker.scss";

const SCRIPT_ID = "ymaps-loader";

const loadYmaps = () =>
  new Promise((resolve, reject) => {
    if (window.ymaps?.ready) {
      window.ymaps.ready(() => resolve(window.ymaps));
      return;
    }
    let script = document.getElementById(SCRIPT_ID);
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(
        YANDEX_MAPS_KEY
      )}&lang=ru_RU`;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => window.ymaps.ready(() => resolve(window.ymaps)));
    script.addEventListener("error", () => reject(new Error("ymaps_load_failed")));
  });

/**
 * Modal map: the customer drops a pin, we reverse-geocode it into street/house
 * and hand both the text and the coordinates back. The coordinates are what
 * actually helps the courier — addresses in the region are often approximate.
 */
const MapPicker = ({ zone, value, onPick, onClose }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const ymapsRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [point, setPoint] = useState(value?.lat ? { ...value } : null);
  const [address, setAddress] = useState(null);
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;

    const describe = async (coords) => {
      setResolving(true);
      try {
        const result = await ymapsRef.current.geocode(coords);
        const first = result.geoObjects.get(0);
        if (!first) return;
        const next = {
          street: first.getThoroughfare() || "",
          house: first.getPremiseNumber() || "",
          label: first.getAddressLine(),
        };
        if (!cancelled) setAddress(next);
      } catch {
        if (!cancelled) setAddress(null);
      } finally {
        if (!cancelled) setResolving(false);
      }
    };

    loadYmaps()
      .then((ymaps) => {
        if (cancelled || !containerRef.current) return;
        ymapsRef.current = ymaps;

        const start = point ? [point.lat, point.lng] : zone?.mapCenter ?? [41.3111, 69.2797];
        const map = new ymaps.Map(containerRef.current, {
          center: start,
          zoom: point ? 17 : 13,
          controls: ["zoomControl", "geolocationControl", "searchControl"],
        });
        mapRef.current = map;

        const mark = new ymaps.Placemark(start, {}, { draggable: true, preset: "islands#redDotIcon" });
        map.geoObjects.add(mark);

        const move = (coords) => {
          mark.geometry.setCoordinates(coords);
          setPoint({ lat: coords[0], lng: coords[1] });
          describe(coords);
        };

        map.events.add("click", (event) => move(event.get("coords")));
        mark.events.add("dragend", () => move(mark.geometry.getCoordinates()));

        setStatus("ready");
        if (point) describe(start);
      })
      .catch(() => !cancelled && setStatus("error"));

    return () => {
      cancelled = true;
      mapRef.current?.destroy();
      mapRef.current = null;
    };
    // Mount-only: re-running would tear down and rebuild the map under the user.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirm = () => {
    if (!point) return;
    onPick({
      lat: Number(point.lat.toFixed(6)),
      lng: Number(point.lng.toFixed(6)),
      street: address?.street || "",
      house: address?.house || "",
    });
  };

  return (
    <div className="mappicker" role="dialog" aria-modal="true" aria-label="Указать адрес на карте">
      <div className="mappicker__backdrop" onClick={onClose} />
      <div className="mappicker__panel">
        <header className="mappicker__head">
          <h3>Укажите адрес на карте</h3>
          <button type="button" onClick={onClose} aria-label="Закрыть">
            <i className="bx bx-x" />
          </button>
        </header>

        <div className="mappicker__map" ref={containerRef}>
          {status === "loading" && <p className="mappicker__state">Загружаем карту…</p>}
          {status === "error" && (
            <p className="mappicker__state">
              Карта не загрузилась. Закройте окно и введите адрес вручную — заказ примем так же.
            </p>
          )}
        </div>

        <footer className="mappicker__foot">
          <p className="mappicker__address">
            {resolving
              ? "Определяем адрес…"
              : address?.label || (point ? "Адрес не определён — точку курьер увидит" : "Нажмите на карту или перетащите метку")}
          </p>
          <button
            type="button"
            className="mappicker__confirm"
            disabled={!point}
            onClick={confirm}
          >
            Подтвердить
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MapPicker;

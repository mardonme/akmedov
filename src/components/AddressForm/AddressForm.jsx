import FormField from "../FormField/FormField";
import { deliveryZones } from "../../constants/delivery";
import { formatSum } from "../../utils/delivery";
import "./AddressForm.scss";

/**
 * Step 1 of the order form. Fully controlled: the Delivery page owns the
 * values so the map picker can write straight into the same state.
 */
const AddressForm = ({ values, errors, onChange, onOpenMap, mapEnabled, zone }) => {
  const set = (field) => (event) => onChange({ [field]: event.target.value });

  return (
    <div className="address-form">
      <div className="address-form__grid">
        <FormField
          label="Город доставки"
          name="zoneId"
          as="select"
          required
          value={values.zoneId}
          error={errors.zoneId}
          // Changing the city invalidates the district list and can drop the
          // chosen slot, so both are reset here rather than left stale.
          onChange={(event) =>
            onChange({ zoneId: event.target.value, district: "", slotId: "" })
          }
        >
          <option value="">Выберите город</option>
          {deliveryZones.map((item) => (
            <option key={item.id} value={item.id}>
              {item.city} ({item.region})
            </option>
          ))}
        </FormField>

        <FormField
          label="Район"
          name="district"
          as="select"
          value={values.district}
          error={errors.district}
          disabled={!zone}
          onChange={set("district")}
        >
          <option value="">{zone ? "Не указан" : "Сначала выберите город"}</option>
          {(zone?.districts ?? []).map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </FormField>

        <FormField
          label="Улица"
          name="street"
          required
          placeholder="Достлик"
          maxLength={120}
          value={values.street}
          error={errors.street}
          onChange={set("street")}
        />

        <FormField
          label="Дом"
          name="house"
          required
          placeholder="20"
          maxLength={20}
          value={values.house}
          error={errors.house}
          onChange={set("house")}
        />

        <FormField
          label="Квартира"
          name="flat"
          placeholder="5"
          maxLength={20}
          value={values.flat}
          onChange={set("flat")}
        />

        <FormField
          label="Ориентир"
          name="landmark"
          placeholder="напротив школы №3"
          maxLength={200}
          value={values.landmark}
          onChange={set("landmark")}
        />
      </div>

      {mapEnabled && (
        <div className="address-form__map-row">
          <button type="button" className="address-form__map-btn" onClick={onOpenMap}>
            <i className="bx bx-map-pin" />
            {values.lat ? "Изменить точку на карте" : "Указать на карте"}
          </button>
          {values.lat && (
            <span className="address-form__map-ok">
              <i className="bx bx-check" /> Точка сохранена — курьер получит её вместе с заказом
            </span>
          )}
        </div>
      )}

      {zone && (
        <p className="address-form__terms">
          Доставка {formatSum(zone.fee)} · минимальный заказ {formatSum(zone.minOrder)}
        </p>
      )}
    </div>
  );
};

export default AddressForm;

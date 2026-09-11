/**
 * Labelled form control. Uncontrolled by default (Contact relies on FormData),
 * but accepts value/onChange, an error message and select options so the
 * delivery form can drive it as a controlled field.
 *
 * The wrapper keeps the .form-group / .form-groups class names, so each page
 * styles its own fields inside its own scope.
 */
const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  as = "input",
  error,
  hint,
  required = false,
  className = "",
  children,
  ...rest
}) => {
  const Tag = as;
  const group = as === "textarea" ? "form-groups" : "form-group";
  // type is only meaningful on <input>; React would render it onto a
  // <textarea>/<select> otherwise.
  const typeProp = as === "input" ? { type } : {};

  return (
    <div
      className={`${group} ${error ? "has-error" : ""} ${className}`.trim()}
      data-aos="fade-up"
    >
      <label htmlFor={name}>
        {label}
        {required && <span className="form-required"> *</span>}
      </label>
      <Tag
        id={name}
        name={name}
        placeholder={placeholder}
        aria-invalid={error ? "true" : undefined}
        {...typeProp}
        {...rest}
      >
        {children}
      </Tag>
      {error ? (
        <small className="form-error">{error}</small>
      ) : (
        hint && <small className="form-hint">{hint}</small>
      )}
    </div>
  );
};

export default FormField;

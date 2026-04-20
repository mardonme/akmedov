const FormField = ({ label, name, type = "text", placeholder, as = "input" }) => {
  const Tag = as;
  return (
    <div className={as === "textarea" ? "form-groups" : "form-group"} data-aos="fade-up">
      <label htmlFor={name}>{label}</label>
      <Tag
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;

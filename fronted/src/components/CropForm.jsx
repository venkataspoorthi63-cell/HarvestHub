import { useEffect, useState } from "react";
import VoiceInput from "./VoiceInput";

const CATEGORIES = [
  "Grains",
  "Vegetables",
  "Fruits",
  "Pulses",
  "Spices",
  "Other"
];

const UNITS = [
  "kg",
  "quintal",
  "ton",
  "litre",
  "pieces"
];

const emptyForm = {
  name: "",
  category: "Grains",
  quantity: "",
  unit: "kg"
};

export default function CropForm({
  initialValues,
  onSubmit,
  submitText = "Save Crop",
  loading = false
}) {

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {

    if (initialValues) {

      setForm({
        name: initialValues.name || "",
        category: initialValues.category || "Grains",
        quantity: initialValues.quantity ?? "",
        unit: initialValues.unit || "kg"
      });

    }

  }, [initialValues]);

  function handleChange(event) {

    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  function applyVoiceText(text) {

    setForm((current) => ({
      ...current,
      name: current.name || text
    }));

  }

  async function handleSubmit(event) {

    event.preventDefault();

    setError("");

    const quantity = Number(form.quantity);

    if (!form.name.trim()) {

      setError("Please enter the crop name.");
      return;

    }

    if (!Number.isFinite(quantity) || quantity <= 0) {

      setError("Quantity must be greater than 0.");
      return;

    }

    try {

      await onSubmit({
        name: form.name.trim(),
        category: form.category,
        quantity,
        unit: form.unit
      });

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        "Unable to save crop."
      );

    }
  }

  return (
    <form
      className="card form-card"
      onSubmit={handleSubmit}
    >

      <label>

        Crop Name

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Rice"
        />

      </label>


      <label>

        Category

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >

          {CATEGORIES.map((item) => (
            <option key={item}>
              {item}
            </option>
          ))}

        </select>

      </label>


      <div className="two-col">

        <label>

          Quantity

          <input
            name="quantity"
            type="number"
            min="0.01"
            step="0.01"
            value={form.quantity}
            onChange={handleChange}
            placeholder="500"
          />

        </label>


        <label>

          Unit

          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
          >

            {UNITS.map((item) => (
              <option key={item}>
                {item}
              </option>
            ))}

          </select>

        </label>

      </div>


      <VoiceInput
        onText={applyVoiceText}
      />


      {error && (
        <p className="error">
          {error}
        </p>
      )}


      <button
        className="primary-btn"
        type="submit"
        disabled={loading}
      >

        {loading ? "Saving..." : submitText}

      </button>

    </form>
  );
}
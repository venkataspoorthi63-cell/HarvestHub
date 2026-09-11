import { Link } from "react-router-dom";

export default function CropCard({
  crop,
  onDelete
}) {

  return (
    <article className="crop-card">

      <div className="crop-icon">
        🌾
      </div>


      <div className="crop-main">

        <h3>
          {crop.name}
        </h3>

        <p>
          {crop.category}
        </p>

        <strong>
          {crop.quantity} {crop.unit}
        </strong>

        <span className="badge">
          {crop.qualityStatus || "Not Checked"}
        </span>

      </div>


      <div className="crop-actions">

        <Link
          className="small-btn"
          to={`/crop/${crop._id}`}
        >
          View
        </Link>

        <Link
          className="small-btn"
          to={`/edit-crop/${crop._id}`}
        >
          Edit
        </Link>

        <button
          className="small-btn danger"
          onClick={() => onDelete(crop._id)}
        >
          Delete
        </button>

      </div>

    </article>
  );
}
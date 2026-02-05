import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FEEDBACK_EMAIL } from "~/constants";
import c from "classnames";

export default function FeedbackOverlay() {
  return (
    <Link
      to={`mailto:${FEEDBACK_EMAIL}`}
      className={c(
        "feedback-overlay",

        "bg-stone-950",
        "dark:bg-stone-200",

        "text-stone-200",
        "dark:text-stone-950",

        "hover:bg-stone-700",
        "dark:hover:bg-stone-400",
      )}
    >
      Feedback
    </Link>
  );
}

import React from "react";
import { useParams } from "react-router";
import FeedbackOverlay from "~/components/feedback-overlay";
import Results from "~/results";

export default function Event() {
  const { eventCode } = useParams();

  if (!eventCode) return <div>Something went wrong</div>;

  return (
    <>
      <Results eventCode={eventCode} />
      <FeedbackOverlay />
    </>
  );
}

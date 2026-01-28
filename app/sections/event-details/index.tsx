import React from "react";
import type { SectionProps } from "../props";
import Section from "../common";

export default function EventDetails({ data }: SectionProps) {
  let content;
  if (data === undefined) content = <p>Loading...</p>;
  else if (data === null) content = <p>Error loading event details</p>;
  else {
    const { event } = data.document;
    content = (
      <>
        <p>
          <b>Date and Time: </b>
          {event &&
            new Date(event.startDateTime).toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "medium",
            })}
        </p>
        {event?.venue && (
          <p>
            <b>Location: </b>
            {event.venue}
          </p>
        )}
        {event?.weather && (
          <p>
            <b>Weather: </b>
            {event.weather}
          </p>
        )}
      </>
    );
  }

  return (
    <div id="event-details">
      <Section>{content}</Section>
    </div>
  );
}

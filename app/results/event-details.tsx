import React from "react";
import type { Event, Loadable } from "~/types";

interface EventDetailsProps {
  event: Loadable<Event>;
}

export default function EventDetails({ event }: EventDetailsProps) {
  let content;
  if (event === undefined) content = "Loading...";
  else if (event === null) content = "Error loading event details";
  else
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

  return <section className="race-details">{content}</section>;
}

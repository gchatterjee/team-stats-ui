import React, { useContext } from "react";
import NyrrClient from "~/nyrr-api-client/client";
import { TEAM_CODE } from "~/constants";
import { EventContext } from "~/context";
import OverallResults from "./overall";
import { useLoadable } from "~/utils";
import Awards from "./awards";
import "./index.css";

interface EventProps {
  eventCode: string;
}

export default function Event({ eventCode }: EventProps) {
  const events = useContext(EventContext);

  const event = events?.items.find((event) => event.eventCode === eventCode);
  const client = new NyrrClient();

  const results = useLoadable(
    () => client.getTeamRunners(eventCode, TEAM_CODE),
    [eventCode],
  );

  const awards = useLoadable(
    () => client.getAllRaceAwardRunners(eventCode, TEAM_CODE),
    [eventCode],
  );

  return (
    <div className="content">
      <section className="race-details">
        <p>
          <b>Date and Time: </b>
          {event &&
            new Date(event?.startDateTime).toLocaleString("en-US", {
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
      </section>
      <Awards awards={awards} />
      <OverallResults results={results} />
    </div>
  );
}

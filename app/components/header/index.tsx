import React, { useEffect } from "react";
import { useLoadable } from "~/utils";
import NyrrClient from "~/nyrr-api-client/client";
import { useLocation, useNavigate } from "react-router";
import type { ApiResponse, Loadable, Event } from "~/types";
import "./index.css";
import { NBR_LOGO_URL } from "~/constants";

interface HeaderProps {
  setEvents: React.Dispatch<React.SetStateAction<Loadable<ApiResponse<Event>>>>;
}

const getDefaultValue = (pathname: string, firstEvent: Event) => {
  const match = pathname.match(/\/stats\/([^/]+)/);
  return match ? match[1] : firstEvent.eventCode;
};

export function Header({ setEvents }: HeaderProps) {
  const client = new NyrrClient();
  const navigate = useNavigate();
  const location = useLocation();
  const events = useLoadable(client.getRecentEvents, []);

  useEffect(() => {
    setEvents(events);
    if (location.pathname === "/" && events) {
      const [selected] = events.items;
      navigate(`/stats/${selected.eventCode}`);
    }
  }, [events, location.pathname]);

  let content;
  if (events === undefined) content = <select disabled={true}></select>;
  else if (events === null) content = <p>Error Loading Events</p>;
  else if (events.items.length === 0)
    content = <select disabled={true}></select>;
  else
    content = (
      <select
        className="bg-stone-800 text-stone-200"
        onChange={(e) => navigate(`/stats/${e.target.value}`)}
        defaultValue={getDefaultValue(location.pathname, events.items[0])}
      >
        {events.items.map((event) => (
          <option key={event.eventCode} value={event.eventCode}>
            {event.eventName}
          </option>
        ))}
      </select>
    );

  return (
    <header className="bg-stone-950">
      <div className="header-component">
        <img src={NBR_LOGO_URL} alt="North Brooklyn Runners Logo" />
      </div>
      <div className="header-component">{content}</div>
    </header>
  );
}

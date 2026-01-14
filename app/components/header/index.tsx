import React, { useEffect } from "react";
import { useLoadable } from "~/utils";
import NyrrClient from "~/nyrr-api-client/client";
import { useLocation, useNavigate } from "react-router";
import type { ApiResponse, Event } from "~/nyrr-api-client/types";
import type { Loadable } from "~/types";
import "./index.css";

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

  if (events === undefined) return <select disabled={true}></select>;
  if (events === null) return <p>Oh no</p>;
  if (events.items.length === 0) return <select disabled={true}></select>;

  return (
    <header>
      <img
        src="https://images.squarespace-cdn.com/content/v1/5643b494e4b0cca19eae8be8/d0225f69-1b9a-4c2c-82c4-5f2b3d240170/new_nbr_logo_v2.png"
        alt="North Brooklyn Runners Logo"
      />
      <select
        onChange={(e) => navigate(`/stats/${e.target.value}`)}
        defaultValue={getDefaultValue(location.pathname, events.items[0])}
      >
        {events.items.map((event) => (
          <option key={event.eventCode} value={event.eventCode}>
            {event.eventName}
          </option>
        ))}
      </select>
    </header>
  );
}

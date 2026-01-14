import { createContext } from "react";
import type { ApiResponse, Event } from "./nyrr-api-client/types";
import type { Loadable } from "./types";

export const EventContext =
  createContext<Loadable<ApiResponse<Event>>>(undefined);

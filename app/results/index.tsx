import React from "react";
import OverallResults from "./overall";
import { useLoadable } from "~/utils";
import Awards from "./awards";
import "./index.css";
import axios from "axios";
import type { Document } from "~/types";
import EventDetails from "./event-details";

interface EventProps {
  eventCode: string;
}

const BUCKET_NAME = "team-stats-api-teamstats-121655350650";
const REGION = "us-east-1";
const S3_BASE_URL = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com`;
const AXIOS_CLIENT = axios.create({ baseURL: S3_BASE_URL });

export default function Event({ eventCode }: EventProps) {
  const results = useLoadable(async () => {
    const response = await AXIOS_CLIENT.get<Document>(`/${eventCode}.json`);
    return response.data;
  }, [eventCode]);

  return (
    <div className="content">
      <EventDetails event={results && results.document.event} />
      <Awards
        runners={results && results.document.runners}
        awards={results && results.document.awards}
      />
      <OverallResults
        eventCode={eventCode}
        results={results && results.document.results}
        runners={results && results.document.runners}
      />
    </div>
  );
}

import React from "react";
import OverallResults from "../sections/overall";
import { useLoadable } from "~/utils";
import Awards from "../sections/awards";
import "./index.css";
import axios from "axios";
import type { Document } from "~/types";
import EventDetails from "../sections/event-details";

interface EventProps {
  eventCode: string;
}

const BUCKET_NAME = "team-stats-api-teamstats-121655350650";
const REGION = "us-east-1";
const S3_BASE_URL = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com`;
const AXIOS_CLIENT = axios.create({ baseURL: S3_BASE_URL });

export default function Event({ eventCode }: EventProps) {
  const data = useLoadable(async () => {
    const response = await AXIOS_CLIENT.get<Document>(`/${eventCode}.json`);
    return response.data;
  }, [eventCode]);

  return (
    <div className="content">
      <EventDetails data={data} />
      <Awards data={data} />
      <OverallResults data={data} />
    </div>
  );
}

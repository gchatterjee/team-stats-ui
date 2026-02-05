import React from "react";
import OverallResults from "../sections/overall";
import { useLoadable } from "~/utils";
import Awards from "../sections/awards";
import "./index.css";
import axios from "axios";
import type { Document } from "~/types";
import EventDetails from "../sections/event-details";
import Highlights from "~/sections/highlights";
import {
  findDistanceFirstTimers,
  findTeamFirstTimers,
  findNyrrPersonalRecords,
  findTopTenFinishers,
} from "~/sections/highlights/utils";
import { TEAM_CODE } from "~/constants";
import PersonalRecords from "~/sections/personal-records";
import TopTenFinishers from "~/sections/top-ten-finishers";
import FirstRaceWithNBR from "~/sections/first-race-with-nbr";
import FirstRaceOfDistanceWithNyrr from "~/sections/first-race-of-distance-with-nyrr";

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

  const firstTimeWithNBR = data && findTeamFirstTimers(data, TEAM_CODE);
  const firstRaceOfDistanceWithNyrr = data && findDistanceFirstTimers(data);
  const nyrrPrSetters = data && findNyrrPersonalRecords(data);
  const topTenFinishers = data && findTopTenFinishers(data);

  return (
    <div className="content">
      <EventDetails data={data} />
      <Highlights
        data={data}
        nyrrPrSetters={nyrrPrSetters}
        firstTimeWithNBR={firstTimeWithNBR}
        topTenFinishers={topTenFinishers}
        firstRaceOfDistanceWithNyrr={firstRaceOfDistanceWithNyrr}
      />
      <Awards data={data} />
      <PersonalRecords data={data} personalRecords={nyrrPrSetters} />
      <TopTenFinishers data={data} finisherIds={topTenFinishers} />
      <FirstRaceWithNBR data={data} finisherIds={firstTimeWithNBR} />
      <FirstRaceOfDistanceWithNyrr
        data={data}
        finisherIds={firstRaceOfDistanceWithNyrr}
      />
      <OverallResults data={data} />
    </div>
  );
}

import type { AugmentedRunnerRace, Document } from "~/types";
import type { PersonalRecord } from "./types";

/** Converts a time string in the format HH:MM:SS, MM:SS, or SS to seconds.
 * @param time: string - The time string to convert.
 * @return number - The time in seconds.
 */
export const parseTimeToSeconds = (time: string | undefined): number => {
  if (time === undefined) return Infinity;
  const parts = time.split(":").map((part) => parseFloat(part));
  let seconds = 0;
  if (parts.length === 3) {
    // HH:MM:SS
    seconds += parts[0] * 3600; // hours to seconds
    seconds += parts[1] * 60; // minutes to seconds
    seconds += parts[2]; // seconds
  } else if (parts.length === 2) {
    // MM:SS
    seconds += parts[0] * 60; // minutes to seconds
    seconds += parts[1]; // seconds
  } else if (parts.length === 1) {
    // SS
    seconds += parts[0]; // seconds
  }
  return seconds;
};

/**
 * Compares two RunnerRace objects to determine if raceA is faster than raceB.
 * @param raceATime: string - The time of the first race to compare.
 * @param raceBTime: string - The time of the second race to compare.
 * @returns boolean - true if raceA is faster than raceB, false otherwise.
 */
export const isFaster = (raceATime: string, raceBTime: string): boolean => {
  const timeA = parseTimeToSeconds(raceATime);
  const timeB = parseTimeToSeconds(raceBTime);
  return timeA < timeB;
};

export const isBefore = (dateTimeA: string, dateTimeB: string): boolean => {
  const timeA = new Date(dateTimeA).valueOf();
  const timeB = new Date(dateTimeB).valueOf();
  return timeA < timeB;
};

export const findNyrrPersonalRecords = (data: Document): PersonalRecord[] => {
  const { event, results } = data.document;
  const { items: finishers } = results;
  const { distanceName } = event;
  const prs: PersonalRecord[] = [];
  finishers.forEach((finisher) => {
    const { runnerId, overallTime } = finisher;
    const races = data.document.runners[runnerId].filter(
      (race) => race.distanceName === distanceName,
    );
    let isPr = true;
    const fastestPreviousRace = races.reduce(
      (fastest: AugmentedRunnerRace | undefined, race: AugmentedRunnerRace) => {
        if (!isPr) return undefined; // already disqualified from PR consideration
        if (race.eventCode === event.eventCode) return fastest; // skip current event
        if (isBefore(race.startDateTime, event.startDateTime)) {
          if (isPr && isFaster(race.actualTime, overallTime)) {
            isPr = false; // a previous race was faster than this one
            return undefined;
          } else if (
            fastest === undefined ||
            isFaster(race.actualTime, fastest.actualTime)
          )
            return race; // this is the fastest race we've seen so far, but slower than the event
          else return fastest; // this is not the fastest race we've seen so far, but there's a race that was faster than the event
        }
        return fastest;
      },
      undefined,
    );
    if (isPr && fastestPreviousRace !== undefined)
      prs.push({ finisher, fastestPreviousRace });
  });
  return prs;
};

export const findTeamFirstTimers = (
  data: Document,
  teamCode: string,
): number[] => {
  const { event, runners } = data.document;
  const teamFirstTimers: number[] = [];
  Object.entries(runners).forEach(([runnerId, races]) => {
    const hasRacedTeamBefore = races.some(
      (race) =>
        race.teamCode === teamCode &&
        isBefore(race.startDateTime, event.startDateTime),
    );
    if (!hasRacedTeamBefore) teamFirstTimers.push(parseInt(runnerId, 10));
  });
  return teamFirstTimers;
};

export const findDistanceFirstTimers = (data: Document): number[] => {
  const { event, runners } = data.document;
  const distanceFirstTimers: number[] = [];
  Object.entries(runners).forEach(([runnerId, races]) => {
    const hasRacedDistanceBefore = races.some(
      (race) =>
        race.distanceName === event.distanceName &&
        isBefore(race.startDateTime, event.startDateTime),
    );
    if (!hasRacedDistanceBefore)
      distanceFirstTimers.push(parseInt(runnerId, 10));
  });
  return distanceFirstTimers;
};

export const findTopTenFinishers = (data: Document): number[] => {
  const { results } = data.document;
  const topTen: number[] = [];
  results.items.forEach((finisher) => {
    if (finisher.ageGradePlace <= 10) {
      topTen.push(finisher.runnerId);
    }
  });
  return topTen;
};

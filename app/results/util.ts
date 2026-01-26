import { Gender, type AugmentedRunnerRace, type TeamRunner } from "~/types";

export type Partitioned = Partial<Record<Gender, Record<number, TeamRunner[]>>>;

export const MASTERS_LEVEL = [0, 40, 50, 60, 70, 80, 90, 100, 110, 120];

export const getMastersLevels = (age: number): number[] =>
  MASTERS_LEVEL.filter((level) => level <= age);

export const getTotalFinishersForGender = (
  gender: Gender,
  results: Partitioned,
) => {
  if (!results[gender]) return 0;
  if (!results[gender]![0]) return 0;
  return results[gender]![0]!.length;
};

export const GENDER_LABELS: Record<Gender, string> = {
  [Gender.Women]: "Women",
  [Gender.Men]: "Men",
  [Gender.NonBinary]: "Non-Binary",
};

export const getOrdinal = (n: number): string => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  parts.push(hours.toString().padStart(2, "0"));
  parts.push(minutes.toString().padStart(2, "0"));
  parts.push(seconds.toString().padStart(2, "0"));

  return parts.join(":");
};

export const isFirstRaceWithTeam = (
  eventCode: string,
  races: AugmentedRunnerRace[],
  teamCode: string,
) => {
  try {
    // we assume that the race whose eventCode is passed in was run with the team
    const thisRace = races.find((race) => race.eventCode === eventCode);
    if (!thisRace) return false;

    // check if there are any earlier races with the same teamCode
    return !races.some(
      (race) =>
        race.teamCode === teamCode &&
        new Date(race.startDateTime).valueOf() <
          new Date(thisRace.startDateTime).valueOf(),
    );
  } catch (e) {
    console.error("Error in isFirstRaceWithTeam:", { races }, e);
    return false;
  }
};

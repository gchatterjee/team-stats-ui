import { Gender, type AugmentedRunnerRace } from "~/types";

export const MASTERS_LEVEL = [0, 40, 50, 60, 70, 80, 90, 100, 110, 120];

export const getMastersLevels = (age: number): number[] =>
  MASTERS_LEVEL.filter((level) => level <= age);

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

export const enum TimeUnit {
  SECONDS,
  MILLISECONDS,
}

export const formatTime = (
  units: number,
  unit: TimeUnit = TimeUnit.MILLISECONDS,
): string => {
  const totalSeconds =
    unit === TimeUnit.SECONDS ? units : Math.floor(units / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  parts.push(hours.toString().padStart(2, "0"));
  parts.push(minutes.toString().padStart(2, "0"));
  parts.push(seconds.toString().padStart(2, "0"));

  return parts.join(":");
};

export const formatDuration = (
  units: number,
  unit: TimeUnit = TimeUnit.MILLISECONDS,
): string => {
  const totalSeconds =
    unit === TimeUnit.SECONDS ? units : Math.floor(units / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0 || hours > 0) {
    parts.push(`${minutes}m`);
  }
  parts.push(`${seconds}s`);

  return parts.join(" ");
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

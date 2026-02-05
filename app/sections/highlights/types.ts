import type { AugmentedRunnerRace, TeamRunner } from "~/types";

export interface PersonalRecord {
  finisher: TeamRunner;
  fastestPreviousRace: AugmentedRunnerRace;
}

export type AgeGroup = [from: number, to: number];

/* the correct way to get age group would be to call the NYRR API. There is a *
 * POST /runners/resultDetails that returns a response in the format          *
 *  {                                                                         *
 *    "details": {                                                            *
 *      ...                                                                   *
 *      "ageGroupFromTo": string,                                             *
 *    },                                                                      *
 *    "success": true,                                                        *
 *    "message": null                                                         *
 *  }                                                                         *
 * This field is not returned in whatever I'm calling to get this data, but a *
 * lot of redundant information is also contained in this call from something *
 * else that I'm calling. I'll worry about sourcing this detail from the      *
 * appropriate source of truth when NYRR decides to change the age groups. in *
 * the meantime, we can assume that these are the accurate age groups (based  *
 * on the options in this form:                                               *
 * https://results.nyrr.org/ageGroupAwardsClaimsForm)                         *
 *                                                                            */
const AGE_GROUPS: AgeGroup[] = [
  [0, 14],
  [15, 19],
  [20, 24],
  [25, 29],
  [30, 34],
  [35, 39],
  [40, 44],
  [45, 49],
  [50, 54],
  [55, 59],
  [60, 64],
  [65, 69],
  [70, 74],
  [75, 79],
  [80, Infinity],
];

const isInInclusive = (age: number, group: AgeGroup): boolean => {
  const [from, to] = group;
  return from <= age && age <= to;
};

export const getAgeGroup = (age: number): AgeGroup =>
  AGE_GROUPS.find((group) => isInInclusive(age, group)) || [-Infinity, -1];

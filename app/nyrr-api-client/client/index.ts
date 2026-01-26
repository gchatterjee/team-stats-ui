import { Gender, type ApiResponse, type Event } from "~/types";
import instance from "../instance";

export const GENDERS = [Gender.Women, Gender.NonBinary, Gender.Men];
export const PAGE_SIZE = 100;

export const withPagination = async <T, D>(
  url: string,
  data: D,
): Promise<ApiResponse<T>> => {
  const result: ApiResponse<T> = (
    await instance.post(url, {
      ...data,
      pageIndex: 1,
      pageSize: PAGE_SIZE,
    })
  ).data;
  const pageCount = Math.ceil(result.totalItems / PAGE_SIZE);
  if (pageCount === 0) return result; // this will only happen if there are no items
  const subsequentPages = await Promise.all(
    [...new Array(pageCount - 1)].map(async (_, i) => {
      const pageIndex = i + 2;
      const body = { ...data, pageIndex, pageSize: PAGE_SIZE };
      const response: ApiResponse<T> = (await instance.post(url, body)).data;
      return response.items;
    }),
  );
  subsequentPages.forEach((items) => result.items.push(...items));
  return result;
};

export default class {
  async getRecentEvents(): Promise<ApiResponse<Event>> {
    try {
      return await withPagination("/events/search", {
        sortColumn: "StartDateTime",
      });
    } catch (error) {
      console.error("error retrieving recent events", error);
      throw error;
    }
  }
}

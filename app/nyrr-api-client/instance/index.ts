import axios, { type CreateAxiosDefaults } from "axios";
import { NYRR_API_URL } from "~/constants";

const config: CreateAxiosDefaults = { baseURL: NYRR_API_URL };
export default axios.create(config);

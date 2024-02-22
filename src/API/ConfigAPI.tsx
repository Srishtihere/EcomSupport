import { Configuration } from "@dynopii/callchimp";

export const config = new Configuration({
  basePath: "https://api.callchimp.ai/v1",
  apiKey: `${import.meta.env.VITE_APP_API_KEY}`,
});

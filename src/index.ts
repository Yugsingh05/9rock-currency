import { Elysia } from "elysia";
import {
  cachedCurrencyData,
  cachedAt,
  CACHE_TTL_MS,
  fetchAndCacheCurrencyData,
} from "./currencyData";
import { cors } from "@elysiajs/cors";

const app = new Elysia();

app.use(
  cors({
    origin:
      `${process.env.ENVIRONMENT}` === "development"
        ? ["http://localhost:3000"]
        : `${process.env.ORIGIN_URL}`,
    methods: ["GET"],
    credentials: true,
  }),
);

app.get("/", () => "Hello World!");

app.get("/health", () => {
  return {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
});

app.get("/currency", async () => {
  const isCacheValid = cachedCurrencyData !== null && Date.now() - cachedAt < CACHE_TTL_MS;
  
  if (isCacheValid) {
    console.info("Returning cached currency data...");
    return {
      success: true,
      data: cachedCurrencyData,
    };
  }
  console.info("Cache miss/expired. Fetching fresh currency data...");

  try {
    const refreshedData = await fetchAndCacheCurrencyData();
    return {
      success: true,
      data: refreshedData,
    };
  } catch (error) {
    console.error("GET /currency refresh failed:", error);
  }

  return {
    success: false,
    message: "Failed to refresh currency data",
    data: cachedCurrencyData,
  };
});

app.post("/currency", async () => {
  try {
    const refreshedData = await fetchAndCacheCurrencyData();
    console.log("Currency data fetched and cached successfully");
    return {
      success: true,
      data: refreshedData,
    };
  } catch (error) {
    console.error("Error fetching currency data:", error);
    return {
      success: false,
      message: "Failed to fetch currency data",
    };
  }
});
app.listen(2050, () => {
  console.log("Server is running on http://localhost:2050");
});

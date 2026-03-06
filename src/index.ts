import { Elysia } from "elysia";
import { currencyData } from "./currencyData";
import { cors } from "@elysiajs/cors";

const app = new Elysia();

app.use(
  cors({
    origin:
      `${process.env.ENVIRONMENT}` === "development"
        ? "http://localhost:3000"
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

app.get("/currency", () => {
  return {
    success: true,
    data: currencyData,
  };
});
app.listen(2050, () => {
  console.log("Server is running on http://localhost:2050");
});

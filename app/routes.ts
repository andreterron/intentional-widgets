import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("intention/:id", "routes/intention.$id.tsx"),
] satisfies RouteConfig;

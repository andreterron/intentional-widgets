import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("intention/:id", "routes/intention.$id.tsx"),
  ]),
  route("/.well-known/appspecific/com.chrome.devtools.json", "routes/404.tsx"),
] satisfies RouteConfig;

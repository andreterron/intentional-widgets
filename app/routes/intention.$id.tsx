import { ClientLoaderFunctionArgs } from "react-router";
import { Route } from "./+types/intention.$id";
import { Intention } from "../lib/data/intention";

export function meta({ params }: Route.MetaArgs) {
  const title = Intention.model.selectById(params.id).get()?.title;
  return [
    { title: title ? `${title} - Intentional` : "Intentional" },
    { name: "description", content: "Intentional" },
  ];
}

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  if (!params.id) {
    throw new Response("Not found", { status: 404 });
  }
  const intention = Intention.model.selectById(params.id);
  if (!intention.get()) {
    throw new Response("Not found", { status: 404 });
  }
  return {
    liveIntention: intention,
    intention: intention.get(),
  };
}

export default function IntentionIdRoute({
  loaderData: { intention },
}: Route.ComponentProps) {
  // No updates for now
  return <div>{intention?.title ?? "No title"}</div>;
}

import { ClientLoaderFunctionArgs } from "react-router";
import { Route } from "./+types/intention.$id";
import { useSubscribe } from "live-model";
import { Intention } from "../lib/data/intention";

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
  };
}

export default function IntentionIdRoute({
  loaderData: { liveIntention },
}: Route.ComponentProps) {
  const { value: intention } = useSubscribe(liveIntention);
  return <div>{intention?.title ?? "No title"}</div>;
}

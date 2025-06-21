import { ClientLoaderFunctionArgs } from "react-router";
import { Route } from "./+types/intention.$id";
import { Intention } from "../lib/data/intention";

import React from "react";
import { Input } from "../components/ui/input";
import { useSubscribe } from "../lib/use-subscribe";

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
  const liveIntention = Intention.model.selectById(params.id);
  if (!liveIntention.get()) {
    throw new Response("Not found", { status: 404 });
  }
  return {
    liveIntention,
    intention: liveIntention.get(),
  };
}

export default function IntentionIdRoute({
  loaderData: { liveIntention },
}: Route.ComponentProps) {
  const { value: intention, setValue: setIntention } =
    useSubscribe(liveIntention);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!intention) {
      return;
    }
    setIntention({ ...intention, title: e.target.value ?? "" });
  };

  if (!intention) {
    return;
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="py-5 px-4 max-w-2xl">
        <input
          value={intention.title}
          onChange={handleTitleChange}
          aria-label="Page title"
          className="px-2 py-1.5 -mx-2 text-2xl w-full box-content mb-6"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input type="text" placeholder="Generate" className="text-base" />
        </form>
      </div>
    </div>
  );
}

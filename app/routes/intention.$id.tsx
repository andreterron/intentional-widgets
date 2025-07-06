import { ClientLoaderFunctionArgs, useNavigate } from "react-router";
import { Route } from "./+types/intention.$id";
import { Intention } from "../lib/data/intention";

import React from "react";
import { Input } from "../components/ui/input";
import { useModel, useSubscribe } from "live-model";
import { WidgetCard } from "../components/widget";
import { Widget } from "../lib/data/widget";
import PlanBlock from "../components/plan";
import Page from "../components/page";
import { Button } from "../components/ui/button";
import { TrashIcon } from "lucide-react";

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
  const { items: allWidgets, create } = useModel<Widget>("Widgets");
  const { value: intention, setValue: setIntention } =
    useSubscribe(liveIntention);
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!intention) {
      return;
    }
    setIntention({ ...intention, title: e.target.value ?? "" });
  };

  const [generating, setGenerating] = React.useState(false);

  const handleGenerate = async (prompt: string) => {
    if (!intention) {
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("http://localhost:3000/openai", {
        method: "POST",
        body: JSON.stringify({ intention: intention.title, prompt }),
      });
      const code = await res.text();
      create({
        code,
        intentionId: intention.id,
      });
    } finally {
      setGenerating(false);
    }
  };

  const widgets = allWidgets.filter(
    (w) => intention && w.intentionId === intention.id,
  );

  if (!intention) {
    return;
  }

  return (
    <Page
      navbar={
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            Intention.model.deleteById(intention.id);
            navigate("/");
          }}
        >
          <TrashIcon />
        </Button>
      }
    >
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
            const form = new FormData(e.target as HTMLFormElement);
            const prompt = form.get("widget_prompt");
            if (typeof prompt === "string") {
              handleGenerate(prompt);
            }
          }}
        >
          <Input
            type="text"
            name="widget_prompt"
            placeholder="Generate"
            className="text-base"
            disabled={generating}
          />
        </form>
        <div className="flex flex-col gap-4 mt-6">
          <PlanBlock
            key={intention.id}
            initialContent={intention.pageContent}
            onContentChange={(content) =>
              liveIntention.setValue({ ...intention, pageContent: content })
            }
          />
          {widgets.map((w) => (
            <WidgetCard key={w.id} widget={w} />
          ))}
        </div>
      </div>
    </Page>
  );
}

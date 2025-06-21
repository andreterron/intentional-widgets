import type { Route } from "./+types/home";
import type React from "react";

import { useLiveState, useModel } from "live-model";
import { Button } from "../components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Intention } from "../lib/data/intention";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Intentional" },
    { name: "description", content: "Intentional" },
  ];
}

export default function Home() {
  const { value: input, setValue: setInput } = useLiveState("Draft", "");
  const { create: createIntention } = useModel<Intention>("Intentions");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = input.trim();
    if (title) {
      const intention = createIntention({
        title,
      }).get();

      if (!intention) {
        console.error("Failed to create intention");
        return;
      }
      console.log("Starting intentional session with:", title);
      navigate(`/intention/${intention.id}`);
      // Here you would handle the input submission
      setInput("");
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            What are we doing?
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <div className="space-y-2 grow shrink">
            <Input
              placeholder="Type an intention…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={cn(
                "text-lg md:text-base file:text-sm",
                "px-4 py-2",
                "h-auto",
              )}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="grow-0 shrink-0"
            disabled={!input.trim()}
          >
            <ArrowRightIcon />
          </Button>
        </form>
      </div>
    </main>
  );
}

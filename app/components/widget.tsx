import { useEffect } from "react";
import { Widget } from "../lib/data/widget";
import { useComponentPreview } from "./component-preview";
import { Card } from "./ui/card";

export function WidgetCard({ widget }: { widget: Widget }) {
  const { code, setCode, codeRef, iframe, run, dirty } = useComponentPreview(
    widget.code,
  );

  useEffect(() => {
    run()?.catch((e) => console.error(e));
  }, [widget.code]);

  return <Card className="overflow-hidden h-96">{iframe}</Card>;
}

import { useComponentPreview } from "./component-preview";

export function Widget() {
  const { code, setCode, codeRef, iframe, run, dirty } =
    useComponentPreview("");

  return <>Hi!</>;
}

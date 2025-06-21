import { Model } from "live-model";

export interface Intention {
  id: string;
  title: string;
}

export namespace Intention {
  export const key = "Intentions";
  export const model = new Model(Intention.key);
}

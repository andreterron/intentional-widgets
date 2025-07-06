import { Model } from "live-model";
import { Content } from "../../components/plan";

export interface Intention {
  id: string;
  title: string;
  pageContent?: Content;
}

export namespace Intention {
  export const key = "Intentions";
  export const model = new Model<Intention>(Intention.key);
}

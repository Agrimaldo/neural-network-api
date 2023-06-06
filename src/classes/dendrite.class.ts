import { Pulse } from "./pulse.class";

export class Dendrite {
  InputPulse: Pulse;
  SynapticWeight: number;
  Learnable: boolean;

  constructor(dendrite?: Partial<Dendrite>) {
    this.InputPulse = dendrite?.InputPulse || new Pulse();
    this.SynapticWeight = dendrite?.SynapticWeight || 0;
    this.Learnable = dendrite?.Learnable || true;
  }
}
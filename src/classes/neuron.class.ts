import { Dendrite } from './dendrite.class';
import { Pulse } from './pulse.class';

export class Neuron {
  Dendrites: Dendrite[];
  OutputPulse: Pulse;
  Weight: number;

  constructor() {
    this.Dendrites = [];
    this.OutputPulse = new Pulse();
    this.Weight = 0;
  }

  Sum(): number {
    let computeValue: number = 0;
    this.Dendrites.forEach((d: Dendrite) => {
      computeValue += Math.round(d.InputPulse.Value * d.SynapticWeight);
    });

    return computeValue;
  }

  Activation(input: number): number {
    const threshold = 1;
    return input <= threshold ? 0 : threshold;
  }

  Fire(): void {
    this.OutputPulse.Value = this.Sum();
    this.OutputPulse.Value = this.Activation(this.OutputPulse.Value);
  }

  // Compute(learningRate: number, delta: number): void {
  //   this.Weight += learningRate * delta;
  //   this.Dendrites.forEach((d: Dendrite) => {
  //     d.SynapticWeight = this.Weight;
  //   });
  // }

  UpdateWeights(newWeights: number): void {
    this.Dendrites.forEach((dendrite: Dendrite) => {
      dendrite.SynapticWeight = Math.round(newWeights);
    });
  }

}
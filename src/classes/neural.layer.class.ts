import { Neuron } from './neuron.class';

export class NeuralLayer {
  Neurons: Neuron[] = [];
  Name: string;
  Weight: number;

  constructor(count: number, initialWeight: number, name: string = '') {
    this.Neurons = [];
    for (let i = 0; i < count; i++) {
      const neuron = new Neuron();
      this.Neurons.push(neuron);
    }
    this.Weight = initialWeight;
    this.Name = name;
  }

  // Compute(learningRate: number, delta: number): void {
  //   this.Neurons.forEach((n: Neuron) => {
  //     n.Compute(learningRate, delta);
  //   });
  // }

  Log(): void {
    console.log(`Name: ${this.Name}, Weight: ${this.Weight}`);
  }

  Optimize(learningRate: number, delta: number): void {
    this.Weight += learningRate * delta;
    this.Neurons.forEach((neuron: Neuron) => {
      neuron.UpdateWeights(this.Weight);
    });
  }

  Forward(): void {
    this.Neurons.forEach((neuron: Neuron) => {
      neuron.Fire();
    });
  }
}

export class NeuralData {
  Data: number[][] = [];
  Counter: number = 0;

  Add(rec: number[]): void {
    this.Data[this.Counter] = rec;
    this.Counter++;
  }
}
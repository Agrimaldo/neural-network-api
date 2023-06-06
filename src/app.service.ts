import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  //#region PROPS
  private SynapseMatrixColumns: number;
  private SynapseMatrixLines: number;
  private SynapseMatrix: number[][];
  //#endregion
  constructor() {
    this.SynapseMatrixLines = 1;
    this.SynapseMatrixColumns = 3;
  }
  private generateSynapsesMatrix(): void {
    this.SynapseMatrix = [];
    //this.SynapseMatrix = new Array<number>(this.SynapseMatrixLines, this.SynapseMatrixColumns);
    for (var i = 0; i < this.SynapseMatrixLines; i++) {
      this.SynapseMatrix[i] = [];
      for (var j = 0; j < this.SynapseMatrixColumns; j++) {
        const randomNumber: number = Math.floor((Math.random() * 100) + 1);
        this.SynapseMatrix[i][j] = (2 * randomNumber) - 1;
      }
    }
  }

  private calculateSigmoid(matrix: number[][]): number[][] {

    return [];
  }

  getHello(): string {
    return 'Hello World!';
  }


}

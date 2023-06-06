import { Dendrite } from './dendrite.class';
import { NeuralLayer } from './neural.layer.class';
import { Neuron } from './neuron.class';
import { NeuralData } from './neural.data.class';

export class NetworkModel {
  Layers: NeuralLayer[] = [];

  AddLayer(layer: NeuralLayer): void {
    let dendriteCount: number = 1;
    if (this.Layers.length > 0) {
      dendriteCount = this.Layers[this.Layers.length - 1].Neurons.length;
    }
    layer.Neurons.forEach((neuron: Neuron) => {
      for (let i: number = 0; i < dendriteCount; i++) {
        neuron.Dendrites.push(new Dendrite());
      }
    });
  }

  Build(): void {

    this.Layers.forEach((layer: NeuralLayer, index: number) => {
      if (index < this.Layers.length - 1) {
        const nextLayer = this.Layers[index + 1];
        this.CreateNetwork(this.Layers[index], nextLayer);
      }
    });
    //let i: number = 0;
    // while (i < this.Layers.length) {
    //   if (i >= this.Layers.length - 1)
    //     break;

    //   const nextLayer = this.Layers[i + 1];
    //   this.CreateNetwork(this.Layers[i], nextLayer);
    //   i++;
    // }
  }

  // public void Build()
  // {
  //     int i = 0;
  //     foreach (var layer in Layers)
  //     {
  //         if (i >= Layers.Count - 1)
  //         {
  //             break;
  //         }

  //         var nextLayer = Layers[i + 1];
  //         CreateNetwork(layer, nextLayer);

  //         i++;
  //     }
  // }  

  Train(x: NeuralData, y: NeuralData, interations: number, learningRate: number = 0.1): void {
    let epoch: number = 1;
    while (interations >= epoch) {
      //const inputLayer = this.Layers[0];
      const outputs: number[] = [];
      for (let i: number = 0; i < x.Data.length; i++) {
        for (let j: number = 0; j < x.Data[i].length; j++) {
          //inputLayer.Neurons[j].OutputPulse.Value = x.Data[i][j];
          let x_data = x.Data[i][j];
          this.Layers[0].Neurons[j].OutputPulse.Value = x_data;
        }
        this.ComputeOutput();
        //console.log(`${this.Layers.length}  -- ${JSON.stringify(this.Layers[this.Layers.length - 1].Neurons)} \r\n`)
        //console.log(`this.Layers[this.Layers.length - 1].Neurons[0].OutputPulse.Value = ${this.Layers[this.Layers.length - 1].Neurons[0].OutputPulse.Value} `)
        outputs.push(this.Layers[this.Layers.length - 1].Neurons[0].OutputPulse.Value);
      }

      let accuracySum: number = 0;
      let yCounter: number = 0;
      outputs.forEach((output: number) => {
        //console.log(`${output} == ${y.Data[yCounter][0]}`);
        let y_value = y.Data[yCounter][0];
        if (output == y_value) {
          accuracySum++;
        }
        yCounter++;
      });

      this.OptimizeWeights(accuracySum / yCounter);
      console.log(`Epoch: ${epoch}, Accuracy: ${(accuracySum / yCounter) * 100} % -- ${accuracySum} / ${yCounter}`); //\r\n\r\n
      epoch++;
    }
  }

  Print(): void {
    const logColumns: string[] = ['Name', 'Neurons', 'Weight'];
    const logContent = [];
    this.Layers.forEach((layer: NeuralLayer) => {
      logContent.push({ Name: layer.Name, Neurons: layer.Neurons.length, Weight: layer.Weight });
    });

    console.table(logContent, logColumns);
  }

  private CreateNetwork(connectingFrom: NeuralLayer, connectingTo: NeuralLayer) {

    connectingFrom.Neurons.forEach((from: Neuron) => {
      from.Dendrites.push(new Dendrite());
    });

    connectingTo.Neurons.forEach((to: Neuron) => {
      connectingFrom.Neurons.forEach((from: Neuron) => {
        to.Dendrites.push(new Dendrite({ InputPulse: from.OutputPulse, SynapticWeight: connectingTo.Weight }));
      });
    });
  }

  private ComputeOutput(): void {
    this.Layers.forEach((layer: NeuralLayer, index: number) => {
      if (index > 0) {
        layer.Forward();
      }
    });
  }

  private OptimizeWeights(accuracy: number): void {
    let learningRate: number = 0.1;
    if (accuracy == 1.0) {
      return;
    }
    if (accuracy > 1.0) {
      learningRate = -learningRate;
    }
    this.Layers.forEach((layer: NeuralLayer) => {
      layer.Optimize(learningRate, 1)
    });
  }
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NetworkModel } from './classes/network.model.class';
import { NeuralData } from './classes/neural.data.class';
import { NeuralLayer } from './classes/neural.layer.class';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const model: NetworkModel = new NetworkModel();
  model.Layers.push(new NeuralLayer(2, 0.1, 'INPUT'));
  model.Layers.push(new NeuralLayer(1, 0.1, 'OUTPUT'));
  model.Build();
  console.log('----Before Training------------');
  model.Print();

  const X: NeuralData = new NeuralData();//NeuralData(4);
  X.Add([0, 0]);
  X.Add([0, 1]);
  X.Add([1, 0]);
  X.Add([1, 1]);

  const Y: NeuralData = new NeuralData();//NeuralData(4);
  Y.Add([0]);
  Y.Add([0]);
  Y.Add([0]);
  Y.Add([1]);

  model.Train(X, Y, 10, 0.1);
  console.log("----After Training------------");
  model.Print();
}
bootstrap();

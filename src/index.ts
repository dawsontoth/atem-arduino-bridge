import { connectATEM } from './atem';
import { startMQTTBroker } from './mqtt-broker';
import { connectMQTTClient } from './mqtt-client';

(async () => {
  console.log('Starting MQTT broker...');
  await startMQTTBroker();
  console.log('Connecting to MQTT broker...');
  await connectMQTTClient();
  console.log('Connecting to ATEM...');
  await connectATEM();
  console.log('Started!');
})();

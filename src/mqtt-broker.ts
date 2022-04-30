import { Server } from 'aedes';
import { createServer } from 'net';
import { mqttPort } from './env';

export function startMQTTBroker() {
  return new Promise<void>(resolve => {
    const aedes = Server();
    const server = createServer(aedes.handle);
    server.listen(mqttPort, () => {
      resolve();
    });
  });
}

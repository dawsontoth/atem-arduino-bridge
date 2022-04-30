import { Client, connect } from 'mqtt';

let client: Client;

export async function connectMQTTClient() {
  return new Promise<void>(resolve => {
    client = connect('mqtt://0.0.0.0');
    client.on('connect', () => resolve());
  });
}

export function broadcast(topic: string, message: string) {
  client?.publish(topic, message);
}

export function subscribe(topic: string, handler: (message: Buffer) => void) {
  client.subscribe(topic);
  client.on('message', (messageTopic: string, message: Buffer) => {
    if (topic === messageTopic) {
      handler(message);
    }
  });
}

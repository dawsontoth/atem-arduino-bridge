if (!process.env.ATEM_ADDRESS) {
  throw new Error('Please define ATEM_ADDRESS env variable!');
}
export const atemAddress = process.env.ATEM_ADDRESS;

export const mqttPort = 1883;

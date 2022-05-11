import { Atem, AtemState } from 'atem-connection';
import { atemAddress, overrideState } from './env';
import { broadcast, subscribe } from './mqtt-client';

const myATEM = new Atem();

let latestState = overrideState || 'm:Connecting...';

export async function connectATEM() {
  if (!overrideState) {
    myATEM.on('info', e => {
      if (e === 'reconnect') {
        latestState = 'mRetrying...';
        broadcastLatestState();
      } else {
        console.log('info', e);
      }
    });
    myATEM.on('error', e => {
      latestState = 'mError';
      console.log('error', e);
    });
    myATEM.on('disconnected', () => {
      latestState = 'mDisconnected';
      broadcastLatestState();
    });
    myATEM.on('connected', () => processStateUpdate(myATEM.state));
    myATEM.on('stateChanged', (state: AtemState) => processStateUpdate(state));
  }

  subscribe('auto-transition', autoTransition);
  subscribe('change-program-input', changeProgramInput);
  subscribe('cut', cut);
  subscribe('request-atem-state', broadcastLatestState);
  subscribe('run-macro', runMacro);

  if (!overrideState) {
    await myATEM.connect(atemAddress);
  }
}

function broadcastLatestState() {
  broadcast('atem-state', latestState);
}

async function changeProgramInput(message: Buffer) {
  const [input, me] = String(message)
    .split(',')
    .map(i => parseInt(i.trim()));
  await myATEM.changeProgramInput(input, me);
}

async function runMacro(message: Buffer) {
  const [index] = String(message)
    .split(',')
    .map(i => parseInt(i.trim()));
  await myATEM.macroRun(index);
}

async function cut(message: Buffer) {
  if (overrideState) {
    const split = latestState.split(',');
    split.unshift(split.pop() as string);
    latestState = split.join(',');
    broadcastLatestState();
  } else {
    const [me] = String(message)
      .split(',')
      .map(i => parseInt(i.trim()));
    await myATEM.cut(me);
  }
}

async function autoTransition(message: Buffer) {
  const [me] = String(message)
    .split(',')
    .map(i => parseInt(i.trim()));
  await myATEM.autoTransition(me);
}

function processStateUpdate(state?: AtemState) {
  latestState = [
    (state?.video.mixEffects[0]?.previewInput || 1),
    (state?.video.mixEffects[0]?.programInput || 1),
    (state?.video.mixEffects[1]?.previewInput || 1),
    (state?.video.mixEffects[1]?.programInput || 1),
  ].join(',');
  broadcastLatestState();
}

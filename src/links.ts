export const GITHUB = 'https://github.com/tel-diepholz/elvis';
export const GITHUB_APP = 'https://github.com/tel-diepholz/elvis-app';
export const GITHUB_RELAY = 'https://github.com/tel-diepholz/elvis-relay';
export const GITHUB_HOMEPAGE = 'https://github.com/tel-diepholz/elvis-homepage';
/** Cloud-Relay (App-Ortung, Personalbögen, E-Mail) und seine Statusschnittstelle */
export const RELAY: string = import.meta.env.VITE_RELAY_URL ?? 'https://elvis-relay.hhansen06.workers.dev';
export const STATUS_API = `${RELAY}/v1/status`;

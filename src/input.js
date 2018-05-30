/* @flow */

import fs from 'fs';
import es from 'event-stream';

const stateControl = es.pause();

export function openFile(loc) {
  return fs.createReadStream(loc);
}

export function readFile(handle, handlers) {
  handle
    .pipe(es.split())
    .pipe(es.mapSync(line => {
      stateControl.pause();
      handlers.default(line);
      stateControl.resume();
    }))
    .on('error', err => {
      handlers.error(err);
    })
    .on('end', () => {
      handlers.finished();
    });
  return true;
}

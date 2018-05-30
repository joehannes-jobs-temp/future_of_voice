/* @flow */

import vorpal from 'vorpal';

import { build as buildCLI } from './vorpal';
import * as CMDs from './commands';

const CLI = vorpal();

function bootstrap() {
  CLI.localStorage('joehannes_jubilaeum_bewerbung');
  buildCLI(CLI, [
    {
      symbol: 'load',
      help: 'Loads client coordinates from a sepcified url',
      action: CMDs.handleFile(CLI.localStorage),
    },
    {
      symbol: 'clear',
      help: 'Resets/Deletes already loaded customer-data',
      action: CMDs.clear(CLI.localStorage),
    },
    {
      symbol: 'print',
      help: 'Prints the customers IDs and distances',
      action: CMDs.print(CLI.localStorage),
    },
    {
      symbol: 'calc',
      help: 'Calculate the distances to home',
      action: CMDs.calc(CLI.localStorage),
    },
  ]);
}

bootstrap();
CLI.delimiter('joehannes@future-of-voice$').show();

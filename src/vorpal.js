/* @flow */

export function attach(
  cli: any,
  command: { symbol: string, help: string, action: (args: {}, callback: () => void) => void }
) {
  return cli
    .command(command.symbol)
    .description(command.help)
    .action(command.action);
}

export function build(
  cli: any,
  commands: Array<{
    symbol: string,
    help: string,
    action: (args: {}, callback: () => void) => void,
  }>
) {
  commands.forEach(cmd => attach(cli, cmd));
  return cli;
}

/* @flow */

import { openFile, readFile } from './input';
import { integrityCheck } from './helpers';

export function handleFile(DB: any) {
  let customers = [];
  try {
    customers = JSON.parse(DB.getItem('customers'));
  } catch (e) {}

  return function (args: {}, callback: () => void) {
    this.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Enter a local path of client locations file: ',
      },
    ]).then(result => {
      const handle = openFile(result.url);
      readFile(handle, {
        default: line => {
          const tmp = line.split(',').map((el, i) => {
            if (i === 0) return el.split(': ')[1];
            else if (i < 3) return Number(el.split(':')[1]);
            return null;
          });
          if (tmp.length < 3) return false;
          if (!integrityCheck(tmp[0].split('-'))) {
            this.log(`CUSTOMER_ID invalid: ${tmp[0]}, skipping ...`);
            return false;
          }
          customers.push({
            id: tmp[0],
            lat: tmp[1],
            long: tmp[2],
          });
          DB.setItem('customers', JSON.stringify(customers));
          return true;
        },
        error: err => {
          this.log(`COULDN'T READ ... ${err}`);
        },
        finished: () => {
          this.log('DONE!!!');
        },
      });
      callback();
    });
  };
}

export function clear(DB: any) {
  return function (args: {}, callback: () => void): void {
    DB.setItem('customers', '[]');
    callback();
  };
}

export function print(DB: any) {
  return function (args: {}, callback: () => void): void {
    let customers = [];
    try {
      customers = JSON.parse(DB.getItem('customers'));
    } catch (e) {}

    this.log(customers);
    callback();
  };
}

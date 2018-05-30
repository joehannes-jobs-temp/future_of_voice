/* @flow */

import { openFile, readFile } from './input';
import { integrityCheck, coordinateCheck } from './helpers';
import greatCircle from './calculate';

export function handleFile(DB: any) {
  return function (args: {}, callback: () => void) {
    let customers = [];
    try {
      customers = JSON.parse(DB.getItem('customers'));
    } catch (e) {}

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
          if (
            !integrityCheck(tmp[0].split('-')) ||
            !coordinateCheck(tmp[1]) ||
            !coordinateCheck(tmp[2])
          ) {
            this.log(`CUSTOMER invalid: ${tmp[0]}, skipping ...`);
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
    DB.setItem('customers', '');
    callback();
  };
}

export function print(DB: any) {
  return function (args: {}, callback: () => void): void {
    let customers = [];
    try {
      customers = JSON.parse(DB.getItem('customers'));
    } catch (e) {}

    customers.sort((a, b) => {
      if (a.id < b.id) return -1;
      else if (a.id > b.id) return 1;
      return 0;
    });
    customers.forEach(c => {
      if (typeof c.d !== 'undefined') {
        this.log(`Client: ${c.id}, D: ${c.d}km`);
      } else {
        this.log(`Client: ${c.id}, lat: ${c.lat}, long: ${c.long}`);
      }
    });
    callback();
  };
}

export function calc(DB: any) {
  return function (args: {}, callback: () => void): void {
    let customers = [];
    try {
      customers = JSON.parse(DB.getItem('customers'));
    } catch (e) {}
    let total = 0;

    this.prompt([
      {
        type: 'input',
        name: 'distance',
        message: 'Enter max distance in km: ',
      },
    ]).then(result => {
      const d = Number(result.distance);
      customers.map(cust => {
        const _d = greatCircle(cust);
        if (_d <= d) {
          total++;
          this.log(`${cust.id}: ${_d}km`);
        }
        return Object.assign(cust, { d: _d });
      });
      DB.setItem('customers', JSON.stringify(customers));
      this.log('----------------------');
      this.log(`Total within max of ${d}km: ${total} client(s)!!!`);
      callback();
    });
  };
}

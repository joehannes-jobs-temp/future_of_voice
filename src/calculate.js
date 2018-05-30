/* @flow */

import { deg2rad } from './helpers';
import homeSettings from './settings';

const home = homeSettings();

export default function harvesine(remote: { lat: any, long: any }) {
  const R = 6371; // Earth radius in km
  const dLat = deg2rad(Number(remote.lat) - Number(home.lat));
  const dLon = deg2rad(Number(remote.long) - Number(home.long));
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(home.lat)) *
      Math.cos(deg2rad(remote.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
}

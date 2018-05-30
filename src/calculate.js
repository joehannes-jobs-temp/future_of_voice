/* @flow */

import { deg2rad } from './helpers';
import home from './settings';

export default function harvesine(remote) {
  const R = 6371; // Earth radius in km
  const dLat = deg2rad(remote.lat - home.lat);
  const dLon = deg2rad(remote.lon - home.lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
}

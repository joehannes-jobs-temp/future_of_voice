import { deg2rad, integrityCheck, coordinateCheck } from '../src/helpers';

describe('helpers.js', () => {
  it('should convert degree to radian', () => {
    expect(deg2rad(180)).toEqual(Math.PI);
  });
  it('should check IDs for their shape', () => {
    const IDs = [
      '87e7954e-2b6e-4572-acc7-81819e639ddd',
      '2cce11c3-6979-42a5-b501-ace4d5e598ec',
      'e24d3cd8-69a4-4095-9de1-3ad27437d288',
      'd7440558-4140-4eb5-ab05-295614c8d1a3',
      '306548a9-0d36-41e1-b667-a48196590ac5',
      '2dded423-8dbb-4e67-b25d-aa359b9c1a2a',
      'e187aea0-95a6-41a7-b75c-3956a48c558d',
      '3e242b9d-0d2d-4d0b-a001-8cadebbc6da2',
    ];
    const Fakes = [
      '7e7954e-2b6e-4572-acc7-81819e639ddd',
      '2cce11c3-679-42a5-b501-ace4d5e598ec',
      'e24d3cd8-69a4-495-9de1-3ad27437d288',
      'd7440558-4140-4eb5-a05-295614c8d1a3',
      '306548a9-0d36-41e1-b667-a4196590ac5',
      '2dded4238dbb-4e67-b25d-aa359b9c1a2a',
      'e187aea0-95a641a7-b75c-3956a48c558d',
      '3e242b9d0d2d4d0ba0018cadebbc6da2',
    ];
    IDs.forEach(ID => expect(integrityCheck(ID.split('-'))).toEqual(true));
    Fakes.forEach(Fake => expect(integrityCheck(Fake.split('-'))).toEqual(false));
  });
  it('should check coordinates are numbers', () => {
    expect(coordinateCheck(Number('55'))).toEqual(true);
    expect(coordinateCheck(null)).toEqual(false);
    expect(coordinateCheck()).toEqual(false);
    expect(coordinateCheck('b0gu5')).toEqual(false);
  });
});

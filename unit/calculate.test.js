import harvesine from '../src/calculate';

describe('calculate.js', () => {
  it('should return a number greater than 0', () => {
    expect(harvesine({ lat: 15, long: 45 })).toBeGreaterThan(0);
  });
  it("should return a number less than earth's half circumference", () => {
    expect(harvesine({ lat: 15, long: 45 })).toBeLessThan(Math.PI * 6371);
  });
});

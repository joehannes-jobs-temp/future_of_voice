import firmenjubilaeum from './index';

describe('index.js', () => {
  it('should say something', () => {
    expect(firmenjubilaeum('🐰')).toEqual('👉 🐰 👈');
    expect(firmenjubilaeum()).toEqual('No args passed!');
  });
});

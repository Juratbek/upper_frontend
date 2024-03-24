import { replaceAll } from './string';

describe('replaceAll', () => {
  it('replaces all m characters with $ sign', () => {
    const res = replaceAll('Lorem ipsum dolor sit amet', 'm', '$');
    expect(res).toEqual('Lore$ ipsu$ dolor sit a$et');
  });
});

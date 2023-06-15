import { getClassName } from '../../utils/common';

describe('getClassName', () => {
  it('combines classnames', () => {
    const className = getClassName('m-1', 'p-1');
    expect(className).toEqual('m-1 p-1');
  });

  it('combines classnames confitionally', () => {
    const className = getClassName('m-1', 'p-1', true && 'pt-2', false && 'pb-3');
    expect(className).toEqual('m-1 p-1 pt-2');
  });
});

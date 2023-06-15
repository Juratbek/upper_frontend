import { getClassName, isClientSide, get, validatePassword } from '../../utils/common';

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

describe('isClientSide', () => {
  it('runs in the browser environment', () => {
    const isClient = isClientSide();
    expect(isClient).toEqual(true);
  });
});

describe('get', () => {
  const mock = { name: 'Aziz', age: 24, address: { city: 'Tashkent' } };
  it('gets inner field of an object', () => {
    const city = get(mock, 'address.city');
    expect(city).toEqual('Tashkent');
  });
  it('returns undefined if field does not exist', () => {
    const city = get(mock, 'blog.name');
    expect(city).toEqual(undefined);
  });
});

describe('validatePassword', () => {
  it('checks for valid password', () => {
    const invalid = validatePassword('passwordA1');
    expect(invalid).toEqual(true);
  });
  it('checks password containing uppercase letters', () => {
    expect(validatePassword('password1')).toEqual(false);
    expect(validatePassword('passworD1')).toEqual(true);
  });
  it('checks password containing lowercase letters', () => {
    expect(validatePassword('PASSWORD1')).toEqual(false);
    expect(validatePassword('PASSWORd1')).toEqual(true);
  });
  it('checks password containing numbers', () => {
    expect(validatePassword('passworD')).toEqual(false);
    expect(validatePassword('passworD1')).toEqual(true);
  });
});

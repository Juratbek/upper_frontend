import { render } from '@testing-library/react';
import { QueryWrapper, ReduxWrapper } from 'tests';

import { Author } from './author';
import { IAuthorProps } from './author.types';

const mock: IAuthorProps = {
  id: 12,
  imgUrl: 'https://upper.uz/image',
  name: "Jur'atbek",
  bio: 'React developer',
};

describe('Author component', () => {
  it('snapshot', () => {
    render(
      <ReduxWrapper>
        <QueryWrapper>
          <Author {...mock} />
        </QueryWrapper>
      </ReduxWrapper>,
    );
    expect(document.body).toMatchSnapshot();
  });
});

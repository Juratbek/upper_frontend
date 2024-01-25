import { BlueBox } from './blue-box/BlueBox';
import { Body } from './body/Body';
import { LandingHeader } from './header/LandingHeader';

export const LandingPage = (): JSX.Element => {
  return (
    <>
      <LandingHeader />
      <main className='container' style={{ paddingTop: 48, flex: 1, width: '100%' }}>
        <BlueBox />
        <Body />
      </main>
    </>
  );
};

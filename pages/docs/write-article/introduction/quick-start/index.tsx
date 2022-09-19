import { Editor } from 'components';

import { QS_DATA } from './QuickStartData';

export default function QuickStartPage(): JSX.Element {
  return (
    <main className='container'>
      <Editor content={QS_DATA} editable={false} />
    </main>
  );
}

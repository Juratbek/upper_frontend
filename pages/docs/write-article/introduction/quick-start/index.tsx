import { Editor } from 'components';
import { QS_DATA } from 'frontends/docs';

export default function QuickStartPage(): JSX.Element {
  return (
    <main className='container'>
      <Editor content={QS_DATA} isEditable={false} />
    </main>
  );
}

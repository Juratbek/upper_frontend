import { Editor } from 'components/Editor';

export default function WriteArticlePage(): JSX.Element {
  return (
    <Editor
      editable={true}
      content={{
        blocks: [],
      }}
    />
  );
}

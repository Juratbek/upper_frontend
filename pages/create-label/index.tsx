import { CreateLabelForm } from 'frontends/create-label';
import { NextPage } from 'next';

const CreateLabelPage: NextPage = () => {
  return (
    <div className='container'>
      <CreateLabelForm />
    </div>
  );
};

export default CreateLabelPage;

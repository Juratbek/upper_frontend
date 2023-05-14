import { Head } from 'components';
import { CreateLabelForm } from 'frontends/create-label';

const CreateLabelPage = (): JSX.Element => {
  return (
    <div className='container'>
      <Head title="Label yaratish uchun so'rov" url='create-label' />
      <CreateLabelForm />
    </div>
  );
};

export default CreateLabelPage;

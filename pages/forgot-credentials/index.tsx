import { Head } from 'components';
import { ForgotCredentialsForm } from 'frontends/forgot-credentials';
import { NextPage } from 'next';

const ForgotCredentialsPage: NextPage = () => {
  return (
    <div>
      <Head title="Shaxsiy ma'lumotlarni tiklash" url='/forgot-credentials' />
      <ForgotCredentialsForm />
    </div>
  );
};

export default ForgotCredentialsPage;

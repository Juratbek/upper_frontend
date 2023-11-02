import { Head } from 'components/lib';
import { ChangeCredentialsForm } from 'frontends/change-credentials';
import { NextPage } from 'next';

const ChangeCredentialsPage: NextPage = () => {
  return (
    <div>
      <Head title="Shaxsiy ma'lumotlarni o'zgartirish" url='/change-credentials' />
      <ChangeCredentialsForm />
    </div>
  );
};

export default ChangeCredentialsPage;

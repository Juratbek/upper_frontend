import { Head } from 'components/lib';
import { Header } from 'components/organisms';
import { Contacts } from 'frontends/contacts';
import { NextPage } from 'next';

const ContactsNextPage: NextPage = () => {
  return (
    <div className='flex-1'>
      <Header />
      <Head title='Aloqa' url='/contacts' />
      <h1 className='text-center'>Biz bilan bog&apos;lanish</h1>
      <Contacts />
    </div>
  );
};

export default ContactsNextPage;

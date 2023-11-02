import { Head } from 'components/lib';
import { Contacts } from 'frontends/contacts';
import { NextPage } from 'next';

const ContactsNextPage: NextPage = () => {
  return (
    <div className='container pt-4'>
      <Head title='Aloqa' url='/contacts' />
      <h1 className='text-center'>Biz bilan bog&apos;lanish</h1>
      <Contacts />
    </div>
  );
};

export default ContactsNextPage;

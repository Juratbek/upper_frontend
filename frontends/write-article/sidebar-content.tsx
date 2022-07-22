import { Button, Divider, Select } from 'components';
import { FC } from 'react';

const options = [
  {
    label: 'JavaScript',
    value: 1,
  },
  {
    label: 'TypeScript',
    value: 2,
  },
  {
    label: 'HTML',
    value: 3,
  },
  {
    label: 'CSS',
    value: 4,
  },
];

export const SidebarContent: FC = () => {
  return (
    <>
      <Button className='w-100'>Chop Etish</Button>
      <Divider className='my-2' />
      <h2>Sozlamalar</h2>
      <label htmlFor='labels'>Teglar</label>
      <Select options={options} />
    </>
  );
};

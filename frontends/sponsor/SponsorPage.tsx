import { Alert, Button, Divider, Head, Modal } from 'components/lib';
import { useAuth, useClipboard, useModal } from 'hooks';
import { FC, useMemo } from 'react';
import { convertToCardNumbers } from 'utils';
import { TELEGRAM_BOT } from 'variables';

const CARD_NUMBER = '8600490418761045';

export const SponsorPage: FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isSponsorModalOpen, toggleSponsorModal, { close: closeSponsorModal }] = useModal();
  const { writeText, isCopied, isLoading: isCopying, isError } = useClipboard();

  const sponsorModal = useMemo(
    () => (
      <Modal isOpen={isSponsorModalOpen} close={closeSponsorModal}>
        {isError && <Alert color='red'>Xatolik yuz berdi, iltimos qayta urinib ko&apos;ring</Alert>}
        <h3>Birodar, muhimi miqdor emas, muhimi niyat :)</h3>
        <p>{convertToCardNumbers(CARD_NUMBER)}</p>
        <Button onClick={(): Promise<void> => writeText(CARD_NUMBER)} loading={isCopying}>
          {isCopied ? 'Nusha olindi' : 'Karta raqamidan nusha olish'}
        </Button>
      </Modal>
    ),
    [isSponsorModalOpen, isCopying, isCopied, isError],
  );

  const actionButton = useMemo(() => {
    if (isLoading) return null;

    return isAuthenticated ? (
      <Button>Maqola yozish</Button>
    ) : (
      <Button>Ro&apos;yxatdan o&apos;tish</Button>
    );
  }, [isLoading, isAuthenticated]);

  return (
    <div className='container mt-4'>
      <Head title="Platformani qo'llab quvvatlash" url='/sponsor-platform' />
      {sponsorModal}
      <h1>Biz uchun eng katta yordam bu biz orqali bilim ulashishingizdir</h1>
      {actionButton}
      <Button color='tertiary' className='ms-1' onClick={toggleSponsorModal}>
        Moliyaviy qo&apos;llab quvvatlash
      </Button>
      <Divider className='my-2' />
      <h3>Taklifingiz bormi, yoki kamandamiz a&apos;zosi bo&apos;lmoqchimisiz? :)</h3>
      <p>Telegram botimizga murojaat qiling</p>
      <a href={TELEGRAM_BOT.link} target='_blank' rel='noreferrer'>
        <Button>Telegram botni ochish</Button>
      </a>
    </div>
  );
};

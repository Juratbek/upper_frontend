import { Button, Modal } from 'components';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useRemoveSectionMutation } from 'store/apis';
import {
  closeRemoveSectionModal,
  getIsRemoveSectionModalOpen,
  getTutorialSelectedSection,
  removeTutorialSection,
} from 'store/states';

export const RemoveSectionModal: FC = () => {
  const isOpen = useAppSelector(getIsRemoveSectionModalOpen);
  const {
    query: { id },
  } = useRouter();
  const selectedSection = useAppSelector(getTutorialSelectedSection);
  const [sendRemoveSectionReq, removeSectionRes] = useRemoveSectionMutation();
  const dispatch = useAppDispatch();

  const close = (): unknown => dispatch(closeRemoveSectionModal());

  if (!selectedSection || !id) return null;

  const removeSection = async (): Promise<void> => {
    await sendRemoveSectionReq({ tutorialId: +id, sectionId: selectedSection.id }).unwrap();
    dispatch(removeTutorialSection(selectedSection.id));
    dispatch(closeRemoveSectionModal());
  };

  return (
    <Modal isOpen={isOpen} close={close} color='outline-red'>
      <h3 className='text-center'>
        &quot;{selectedSection.name}&quot; bo&apos;limini o&apos;chirmoqchimisiz?
      </h3>
      <div className='mt-2 d-flex justify-content-end'>
        <Button color='outline-dark' className='me-1' onClick={close}>
          Modalni yopish
        </Button>
        <Button color='outline-red' onClick={removeSection} loading={removeSectionRes.isLoading}>
          Bo&apos;limni o&apos;chirish
        </Button>
      </div>
    </Modal>
  );
};

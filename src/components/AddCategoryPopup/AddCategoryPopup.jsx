import { useState } from 'react';
import Modal from 'shared/components/Modal/Modal';
import Selector from 'shared/components/Selector';
import Input from 'shared/components/Input';

export default function AddCategoryPopup({ closeModal, ...prop }) {
  const [selectorIsShown, setselectorIsShown] = useState(false);

  const toggleSelectorShown = () => {
    setselectorIsShown(!selectorIsShown);
  };

  return (
    <Modal centered closeModal={closeModal}>
      {/* <Heading>Hello</Heading> */}
      <Input label="" placeholder="Введіть назву нової категорії" />
      <Input
        type="checkbox"
        label="Зробити підкатегорією"
        placeholder="Введіть назву нової категорії"
        checked={() => setselectorIsShown(true)}
      />
      {selectorIsShown && (
        <Selector label="" data={[{ name: 1 }, { name: 2 }, { name: 3 }]} />
      )}
    </Modal>
  );
}

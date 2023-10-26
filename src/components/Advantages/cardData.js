import WindThin from 'shared/icons/WindThin';
import Steak from 'shared/icons/Steak';
import BabayDog from 'shared/icons/BabyDog';
import Ecology from 'shared/icons/Ecology';

const cardData = [
  {
    text: 'Супертехнологія Cold Air Dry. Зберігаємо всі корисні речовини, адже сушимо наші палянички повітрям до 40 градусів.',
    icon: 'WindThin',
  },
  {
    text: 'Аромат. До нього особлива увага. Робимо все, щоб наші смаколики крутяцько пахнули.',
    icon: 'Steak',
  },
  {
    text: 'Смак. Ми в постійному пошуку нових, гармонійних смаків.',
    icon: 'BabayDog',
  },
  {
    text: 'Натуральність. Лише корисні інгредієнти. Жодних консервантів та ароматизаторів.',
    icon: 'Ecology',
  },
];

function getIconComponent(iconName) {
  switch (iconName) {
    case 'WindThin':
      return <WindThin />;
    case 'Steak':
      return <Steak />;
    case 'BabayDog':
      return <BabayDog />;
    case 'Ecology':
      return <Ecology />;
    default:
      return null;
  }
}

export { cardData, getIconComponent };

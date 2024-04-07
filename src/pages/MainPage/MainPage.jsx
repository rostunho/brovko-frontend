import Hero from 'components/Hero/Hero';
import Advantages from 'components/Advantages/Advantages';
import Swiper from 'components/Swiper/Swiper';
import Rectangle from 'components/Rectangle/Rectangle';
import WeInInstgram from 'components/WeInInstagram';
import SEO from 'components/SEO/SEO';

export default function MainPage() {
  return (
    <>
      <SEO
        title="Brovko | Крамниця корисних натуральних снеків для собак"
        description="Brovko - крамниця натуральних снеків для собак. 
        Ароматні, корисні, апетитні смаколикі для собак! 
        Неймовірні палянички із субпродуктів, клітковини, овочів, фруктів, ягід та трав. Зберігаємо всі корисні речовини, адже сушимо наші палянички повітрям до 40 градусів.
        Робимо все, щоб наші смаколики крутяцько пахнули. 
        Ми в постійному пошуку нових, гармонійних смаків. 
        Лише корисні інгредієнти. Жодних консервантів та ароматизаторів."
        url="/main"
      />
      <Hero />
      <Advantages />
      <Rectangle />
      <Swiper />
      <WeInInstgram />
    </>
  );
}

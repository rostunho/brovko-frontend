import Hero from 'components/Hero/Hero';
import Perevagy from 'components/Perevagy/Perevagy';
import Swiper from 'components/Swiper/Swiper';
import Rectangle from 'components/Rectangle/Rectangle';
import Loader from 'components/Loader';
// import styles from './MainPage.scss';

export default function MainPage() {
  return (
    <>
      <Loader />
      <Hero />
      <Perevagy />
      <Rectangle />
      <Swiper />
    </>
  );
}

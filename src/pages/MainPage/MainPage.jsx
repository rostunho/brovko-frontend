import Hero from 'components/Hero/Hero';
import Advantages from 'components/Advantages/Advantages';
import Swiper from 'components/Swiper/Swiper';
import Rectangle from 'components/Rectangle/Rectangle';
// import Loader from 'components/Loader';
// import InstagramEmbededRandom from 'components/InstagramEmbededRandom';
import WeInInstgram from 'components/WeInInstagram';

// import styles from './MainPage.scss';

export default function MainPage() {
  return (
    <>
      {/* <Loader /> */}
      <Hero />
      <Advantages />
      <Rectangle />
      <Swiper />
      {/* <InstagramEmbededRandom /> */}
      <WeInInstgram />
    </>
  );
}

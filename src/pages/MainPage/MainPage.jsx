import Hero from 'components/Hero/Hero';
import InstagramEmbededRandom from 'components/InstagramEmbededRandom';


// import styles from './MainPage.scss';

export default function MainPage() {
  return (
    <>
      <Hero />
      <InstagramEmbededRandom />
      <h2 style={{fontSize:'20px', textAlign: 'center', color: '#FEFEFE', fontWeight: '700' }}>Ми в Instagram</h2>
    </>
  );
}


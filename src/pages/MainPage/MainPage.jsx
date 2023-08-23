import Hero from 'components/Hero/Hero';
import WeInInstagram from 'components/WeInInstagram';

import TestInsta from '../../components/WeInInstagram/TestInsta';
// import styles from './MainPage.scss';

export default function MainPage() {
  return (
    <>
      <Hero />
      {/* <WeInInstagram /> */}
      <h2 style={{fontSize:'20px', textAlign: 'center', color: '#FEFEFE', fontWeight: '700' }}>Ми в Instagram</h2>
      <TestInsta />
    </>
  );
}

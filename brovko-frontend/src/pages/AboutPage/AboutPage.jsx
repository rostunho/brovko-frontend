import { useLocation } from 'react-router-dom';
import SEO from 'components/SEO/SEO';
import Heading from 'shared/components/Heading';
import About from 'components/About/About';
// import styles from './AboutPage.module.scss';

export default function AboutPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>
        Про Бровка
      </Heading>
      {/* <div className={styles.yellowContainer} /> */}
      <SEO
        title="Про Бровка | Brovko - крамниця смаколиків для собак"
        description={
          'Я - Бровко, і я - гурман! Я тут, аби розповісти всьому собакобратству про фантастично смачнючі та корисні смаколики, які готують мої люди. Вони готують, а я їм, я їм - вони готують… Нам так ПОДОБАЄТЬСЯ цей процес, що замріяли створити власну лінійку найкращих у світі снеків для собак. Таких, щоб: користь приносили,  смачними були, пахнули приємно, виглядали апетитною. Радію, що тепер і ти з нами!  Стеж за новинами! Попереду на нас чекає багато смачного!!! '
        }
        url="/all/about"
      />
      <About />
    </>
  );
}

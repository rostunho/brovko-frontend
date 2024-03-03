import { useLocation } from 'react-router-dom';
import SEO from 'components/SEO/SEO';
import Heading from 'shared/components/Heading';
import About from 'components/About/About';
import styles from './AboutPage.module.scss';

export default function AboutPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>
        Про Бровка
      </Heading>
      <SEO
        title="Про Бровка | Brovko - крамниця смаколиків для собак"
        description="Я - Бровко, і я - гурман! Я тут, аби розповісти всьому собакобратству про фантастично смачнючі та корисні смаколики, які готують мої люди."
        url="/all/about"
        baseUrl={process.env.REACT_APP_PUBLIC_URL}
      />
      <About />
    </>
  );
}

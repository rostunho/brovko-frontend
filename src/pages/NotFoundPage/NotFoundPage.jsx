// import styles from './NotFoundPage.module.scss';
import NotFound from '../../components/NotFound/NotFound';
import SEO from 'components/SEO/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Сторінку не знайдено | Brovko"
        description="Сторінку не знайдено | Brovko - магазин натуральних снеків для песиків"
        url="/*"
      />
      <NotFound />
    </>
  );
}

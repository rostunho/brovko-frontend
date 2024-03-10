import { useLocation } from 'react-router-dom';
import Heading from 'shared/components/Heading';
import PublicOffer from 'components/OptionalPages/PublicOffer/PublicOffer';
import SEO from 'components/SEO/SEO';

export default function PublicOfferPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>
        {' '}
        ПУБЛІЧНИЙ ДОГОВІР 'ОФЕРТА'
      </Heading>
      <SEO
        title="Публічний договір Оферта | Brovko"
        description="1.1. Публічна оферта (далі – «Оферта») – публічна пропозиція Продавця, адресована невизначеному колу осіб, укласти з Продавцем договір купівлі-продажу товару дистанційним способом (далі – «Договір») на умовах, що містяться в цій Оферті. 
        1.2. Товар або Послуга – об’єкт угоди сторін, який був обраний покупцем на сайті Інтернет-магазину та поміщений у кошик, або вже придбаний Покупцем у Продавця дистанційним способом. 
        1.2. Інтернет-магазин – сайт Продавця за адресою www.brovko.pet створений для укладення договорів роздрібної та оптової купівлі-продажу на підставі ознайомлення Покупця із запропонованим Продавцем описом Товару за допомогою мережі Інтернет.[...]"
        url="/all/public-offer"
      />
      <PublicOffer />
    </>
  );
}

import { useLocation } from 'react-router-dom';
import Heading from 'shared/components/Heading';
import SEO from 'components/SEO/SEO';
import ExchangeAndReturn from 'components/OptionalPages/ExchangeAndReturn/ExchangeAndReturn';

export default function ExchangeAndReturnPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>
        Обмін і повернення
      </Heading>
      <SEO
        title="Обмін | Повернення | Brovko - магазин натуральних ласощів для собак"
        description="У разі, якщо ми помилилися – привезли вам неякісний товар або не те, що ви замовили – ми за власний рахунок виправимо нашу помилку (обміняємо товар або повернемо гроші) якнайшвидше. Повідомити про помилку можна написавши на пошту або зателефонувавши нам.Якщо товар не задовольнив вас за формою, виглядом, смаком, кольором, або з інших причин не може бути вами використаний за призначенням, ви маєте право на повернення товару належної якості протягом 14 днів, не рахуючи дня покупки. Для організації повернення, будь ласка, надішліть листа на цю пошту brovko.pet@gmail.com"
        url="/all/exchange-and-return"
      />
      <ExchangeAndReturn />
    </>
  );
}

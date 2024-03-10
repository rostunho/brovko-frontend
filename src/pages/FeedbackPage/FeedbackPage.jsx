import Heading from 'shared/components/Heading';
import FeedbackSwitcher from 'components/Feedbacks/FeedbackSwitcher/FeedbackSwitcher';
import FeedbacksList from 'components/Feedbacks/FeedbackList/FeedbacksList';
import SEO from 'components/SEO/SEO';

export default function FeedbackPage() {
  return (
    <>
      <Heading>Звернення клієнтів</Heading>
      <SEO
        title="Профіль адміна | Звернення клієнтів | Brovko"
        description="Профіль адміна. Для нас важливий кожен відгук і пропозиція!!!"
        url="/admin/feedbacks"
      />

      <FeedbackSwitcher />
      <FeedbacksList />
    </>
  );
}

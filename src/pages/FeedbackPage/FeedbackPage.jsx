import Heading from 'shared/components/Heading';
import FeedbackSwitcher from 'components/Feedbacks/FeedbackSwitcher/FeedbackSwitcher';
import FeedbacksList from 'components/Feedbacks/FeedbackList/FeedbacksList';

export default function FeedbackPage() {
  return (
    <>
      <Heading>Звернення клієнтів</Heading>
      <FeedbackSwitcher />
      <FeedbacksList />
    </>
  );
}

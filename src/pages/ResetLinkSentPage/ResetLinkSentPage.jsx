import Heading from 'shared/components/Heading';
import Text from 'shared/components/Text/Text';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import styles from './ResetLinkSentPage.module.scss';

export default function ResetLinkSentPage() {
  return (
    <section className={styles.container}>
      <Heading>Перевірте вашу пошту</Heading>
      <Text className={styles.text}>
        Лист з посиланням для відновлення паролю успішно відправлено на вашу
        електронну адресу. Будь ласка, перевірте вашу поштову скриньку. Перш ніж
        відправити повторний запит, зачекайте. Можливо, доставка повідомлення
        може зайняти кілька хвилин.
      </Text>
      <AuthFormWrapper />
    </section>
  );
}

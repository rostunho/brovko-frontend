import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/user/userSelectors';
import submitFeedback from 'shared/services/api/brovko/feedback';
import Input from 'shared/components/Input';
import Textarea from 'shared/components/Textarea';
import Button from 'shared/components/Button';
import styles from './Contacts.module.scss';

function FeedbackForm() {
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    text: '',
  };
  console.log('user', initialFormData);
  const [formData, setFormData] = useState(initialFormData);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      const { firstName, email, phone } = user;
      setFormData({
        name: firstName || '',
        email: email || '',
        phone: phone || null,
      });
    }
  }, [user]);

  console.log('user', formData);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await submitFeedback(formData, setFormData);
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.feedbackForm}>
      <Input
        className={styles.feedbackInput}
        label="Ім'я:"
        type="text"
        name="name"
        placeholder="Ваше імʼя"
        required={true}
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        className={styles.feedbackInput}
        label="Пошта:"
        type="email"
        name="email"
        placeholder="Ваш емейл"
        required={true}
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        className={styles.feedbackInput}
        label="Номер телефону:"
        type="tel"
        name="phone"
        placeholder="Ваш номер телефону у форматі 050-000-00-00"
        required={true}
        value={formData.phone}
        onChange={handleChange}
        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
      />
      <div style={{ marginTop: '16px' }}>
        <Textarea
          className={styles.feedbackTextarea}
          label="Коментар:"
          id="text"
          name="text"
          placeholder="Ваш коментар"
          value={formData.text}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" size="lg" style={{ marginTop: '32px' }}>
        Надіслати
      </Button>
    </form>
  );
}

export default FeedbackForm;

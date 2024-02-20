import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectUser } from 'redux/user/userSelectors';
import { addFeedback } from 'shared/services/api/brovko/feedback';
import Input from 'shared/components/Input';
import Textarea from 'shared/components/Textarea';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal/Modal';
import { addPopupOperation } from 'redux/popup/popupOperations';
import styles from './Contacts.module.scss';

function FeedbackForm() {
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    text: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user.firstName || '',
        email: user.user.email || '',
        phone: user.user.phone || null,
      });
    }
  }, [user]);
  console.log('user.email', user.user.email);
  console.log('user formData', formData);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addFeedback(formData, setFormData);
      setFormData(initialFormData);
      setShowThankYouModal(true);
    } catch (error) {
      console.error('Error submit feedback', error.response.data.message);
      if (
        error.response.data.message ===
        'Мінімальна довжина тексту повинна бути не менше 10 символів'
      ) {
        dispatch(
          addPopupOperation(
            'Мінімальна довжина тексту повинна бути не менше 10 символів',
            'error'
          )
        );
      } else {
        dispatch(
          addPopupOperation('Щось пішло не так, спробуй пізніше', 'warning')
        );
      }
    }
  };

  const closeModal = () => {
    setShowThankYouModal(false);
  };

  const thankYouModalContent = (
    <Modal closeModal={closeModal}>
      <div className={styles.modal}>
        <h2>Дякуємо за повідомлення!</h2>
        <p className={styles.modalText}>
          Незабаром наш співробітник звʼяжеться з Вами.
        </p>
      </div>
    </Modal>
  );

  return (
    <>
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

      {showThankYouModal && thankYouModalContent}
    </>
  );
}

export default FeedbackForm;

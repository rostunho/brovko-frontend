import instance from './instance';

async function submitFeedback(formData) {
    console.log('formData', formData)
  try {
    const response = await instance.post('/feedback/add-feedback', formData);
    console.log('response', response)
    if (response.status === 200 || 201) {
      console.log('Форма успішно відправлена');
     
    } else {
      console.error('Виникла помилка під час відправки форми');
    }
  } catch (error) {
    console.error('Помилка під час відправки форми:', error);
    throw error;
  }
}

export default submitFeedback;

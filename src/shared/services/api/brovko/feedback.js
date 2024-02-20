import instance from './instance';

export const addFeedback = async body => {
  // console.log('body', body);
  try {
    const response = await instance.post('/feedbacks/add-feedback', body);
    console.log('response', response);
    if (response.status === 200 || 201) {
      console.log('Форма успішно відправлена');
    } else {
      console.error('Виникла помилка під час відправки форми');
    }
  } catch (error) {
    console.error('Помилка під час відправки форми:', error);
    throw error;
  }
};

export const getFeedbacks = async body => {
  const param = body || 'all';

  try {
    const { data } = await instance.get(`/feedbacks/${param}`);
    // console.log('data into API-function:>> ', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateFeedbackStatus = async (id, status) => {
  const body = { status: status };

  try {
    const { data } = await instance.patch(
      `/feedbacks/update-feedback/${id}`,
      body
    );
    console.log(`Відгук з ID(${id}) успішно заархівовано`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

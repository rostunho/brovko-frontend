import { useSelector } from 'react-redux';

import { selectUser } from 'redux/user/userSelectors';

import Heading from 'shared/components/Heading/Heading';
import Input from 'shared/components/Input/Input';
import Button from 'shared/components/Button/Button';

const SuperadminPage = () => {
  const currentUser = useSelector(selectUser);
  console.log(currentUser);

  const handleSubmit = async event => {
    event.preventDefault();

    console.log('now do request');
  };

  return (
    <>
      <Heading withGoBack>Superadmin's page</Heading>
      <form onSubmit={handleSubmit}>
        <Input label="Пошук користувача по емейлу :" />
        <Button type="submit" style={{ marginTop: '10px' }}>
          Знайти
        </Button>
      </form>
    </>
  );
};

export default SuperadminPage;

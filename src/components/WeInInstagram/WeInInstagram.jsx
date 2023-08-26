import Heading from 'shared/components/Heading/Heading';
import background from './we_in_Instagram@3x.jpg';
import Image from 'shared/components/Image';
import { Link } from 'react-router-dom';
import LinkInsta from './LinkInsta';

const WeInInstgram = () => {
  return (
    <>
      <Heading>Ми в Instagram</Heading>
     <LinkInsta />
    </>
  );
};

export default WeInInstgram;

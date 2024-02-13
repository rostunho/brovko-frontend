import { useLocation } from "react-router-dom";
import Heading from 'shared/components/Heading';
import About from 'components/About/About';

export default function AboutPage() {


  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";

  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>Про Бровка</Heading>
      <About />
    </>
  );
}

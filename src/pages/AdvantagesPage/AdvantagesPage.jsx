import { useLocation } from "react-router-dom";
import Heading from 'shared/components/Heading';
import Benefits from 'components/Benefits/Benefits';

export default function AdvantagesPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";
  
  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>Чому це корисно?</Heading>
      <Benefits />
    </>
  );
}

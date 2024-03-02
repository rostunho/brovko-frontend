import { useLocation } from "react-router-dom";
import Heading from 'shared/components/Heading';
import About from 'components/About/About';
import styles from './AboutPage.module.scss'

export default function AboutPage() {


  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";

  return (
   <>
     <div className={styles.yellowContainer}>
     <Heading withGoBack fromHC={backLinkHref}>Про Бровка</Heading>
      <About />
     </div>
      
   </>
    
    
  );
}

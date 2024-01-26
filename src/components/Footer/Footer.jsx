import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useLayoutType from 'shared/hooks/useLayoutType';
import FooterItem from './FooterItem';
import BrovkoFooterIcon from 'shared/icons/BrovkoFooterIcon';
import FooterIcon from './FooterIcon';
import {
  aboutUsLinks,
  supportLinks,
  supportFullLinks,
  companyLinks,
  socialIconsData,
  bankIconsData,
} from './FooterData';

import ArrowDownIcon from 'shared/icons/ArrowDownIcon';
import Rectangle from 'components/Rectangle/Rectangle';
import styles from './Footer.module.scss';

export default function Footer({ onClick }) {
  const [footerState, setFooterState] = useState({
    openedSection: null,
    socialIconStates: {},
    bankIconStates: {},
  });

  const toggleSection = sectionLabel => {
    setFooterState(prevState => ({
      ...prevState,
      openedSection:
        prevState.openedSection === sectionLabel ? null : sectionLabel,
    }));
  };

  const location = useLocation();
  const layoutType = useLayoutType();

  const isMobile = layoutType ==='mobile';
  const isTablet = layoutType === 'tablet';
  const isDesktop = layoutType === 'desktop';

  useEffect(() => {
    // Скидаємо стани іконок при зміні шляху (URL)
    setFooterState(prevState => ({
      ...prevState,
      socialIconStates: {},
      bankIconStates: {},
    }));
  }, [location.pathname]);

  const handleIconClick = (iconLabel, isSocialIcon) => {
    setFooterState(prevState => {
      if (isSocialIcon) {
        return {
          ...prevState,
          socialIconStates: {
            ...prevState.socialIconStates,
            [iconLabel]: !prevState.socialIconStates[iconLabel],
          },
        };
      } else {
        return {
          ...prevState,
          bankIconStates: {
            ...prevState.bankIconStates,
            [iconLabel]: !prevState.bankIconStates[iconLabel],
          },
        };
      }
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLinks}>
        {/* 1 */}
        {!isMobile ?  
        <div><FooterItem
            links={companyLinks}
            icon={<ArrowDownIcon />}
            label="Для вас"
            isOpen={footerState.openedSection === 'Для вас'}
            onToggle={toggleSection}
          /> 
          <p className={styles.labelTablet}>Зв’язатися з нами</p>
          <a href="tel:+380685072222" className={styles.link}>
            +38 (068) 507 22 22
          </a>
          </div> :  
          <FooterItem
            links={aboutUsLinks}
            icon={<ArrowDownIcon />}
            label="Про нас"
            isOpen={footerState.openedSection === 'Про нас'}
            onToggle={toggleSection}
          />}

          {/* 2 */}
         {!isMobile ? <FooterItem
            links={aboutUsLinks}
            icon={<ArrowDownIcon />}
            label="Про нас"
            isOpen={footerState.openedSection === 'Про нас'}
            onToggle={toggleSection}
          /> :  <FooterItem
            links={supportLinks}
            icon={<ArrowDownIcon />}
            label="Допомога"
            isOpen={footerState.openedSection === 'Допомога'}
            onToggle={toggleSection}
          />}
         

          {/* 3 */}
          {!isMobile ? <FooterItem
            links={supportFullLinks}
            icon={<ArrowDownIcon />}
            label="Допомога"
            isOpen={footerState.openedSection === 'Допомога'}
            onToggle={toggleSection}
          /> :
          <FooterItem
            links={companyLinks}
            icon={<ArrowDownIcon />}
            label="Для вас"
            isOpen={footerState.openedSection === 'Для вас'}
            onToggle={toggleSection}
          />}

          {/* 4 */}
          {!isMobile ? 
          <div>
          <p className={styles.labelTablet}>Приєднатися до нас</p>
          <div className={styles.socialIcons} style={{marginBottom: '12px' }}>
          
              {socialIconsData.map(({ label, href, icon }) => (
                <FooterIcon
                  key={label}
                  href={href}
                  icon={icon}
                  label={label}
                  isActive={footerState.socialIconStates[label]}
                  onClick={() => handleIconClick(label, true)}
                />
              ))}
          </div> 
          <p className={styles.labelTablet}>Приймаємо до сплати</p>
          <div className={styles.bankIcons}>
              {bankIconsData.map(({ label, href, icon }) => (
                <FooterIcon
                  key={label}
                  href={href}
                  icon={icon}
                  label={label}
                  isActive={footerState.bankIconStates[label]}
                  onClick={() => handleIconClick(label, false)}
                />
              ))}
            </div>  
            </div>: ''}
        </div>

        <div className={styles.footerBox}>
        {!isMobile ? '' : <>
        <a href="tel:+380685072222" className={styles.link}>
            +38 (068) 507 22 22
          </a>
          
          <div className={styles.footerIconsContainers}>
            <div className={styles.socialIcons}>
              {socialIconsData.map(({ label, href, icon }) => (
                <FooterIcon
                  key={label}
                  href={href}
                  icon={icon}
                  label={label}
                  isActive={footerState.socialIconStates[label]}
                  onClick={() => handleIconClick(label, true)}
                />
              ))}
            </div>
            <div className={styles.bankIcons}>
              {bankIconsData.map(({ label, href, icon }) => (
                <FooterIcon
                  key={label}
                  href={href}
                  icon={icon}
                  label={label}
                  isActive={footerState.bankIconStates[label]}
                  onClick={() => handleIconClick(label, false)}
                />
              ))}
            </div>
          </div>
        </>}
        
          
        </div>
      </div>
      <Rectangle />

<p className={styles.copy}>Copyright 2023 &copy; Бровко</p>
<div className={styles.footerBottom}>
      <BrovkoFooterIcon/>
</div>
      
    </footer>
  );
}

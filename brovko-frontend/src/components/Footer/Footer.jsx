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

  const isMobile = layoutType === 'mobile';
  // const isTablet = layoutType === 'tablet';
  // const isDesktop = layoutType === 'desktop';

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

  const renderFooterItem = (links, icon, label, sectionLabel, isMobile) => (
    <FooterItem
      links={links}
      icon={<ArrowDownIcon />}
      label={label}
      isOpen={footerState.openedSection === sectionLabel}
      onToggle={toggleSection}
    />
  );

  const renderContactInfo = () => (
    <>
      {!isMobile ? <p className={styles.labelTablet}>Зв’язатися з нами</p> : ''}
      <a href="tel:+380681355595" className={styles.link}>
        +38 068 135 55 95
      </a>
    </>
  );

  const renderSocialIcons = () => (
    <div>
      {!isMobile ? (
        <p className={styles.labelTablet}>Приєднатися до нас</p>
      ) : (
        ''
      )}
      <div className={styles.socialIcons} style={{ marginBottom: '12px' }}>
        {socialIconsData.map(({ label, href, icon, ariaLabel }) => (
          <FooterIcon
            key={label}
            href={href}
            ariaLabel={ariaLabel}
            icon={icon}
            label={label}
            isActive={footerState.socialIconStates[label]}
            onClick={() => handleIconClick(label, true)}
          />
        ))}
      </div>
    </div>
  );

  const renderBankIcons = () => (
    <div>
      {!isMobile ? (
        <p className={styles.labelTablet}>Приймаємо до сплати</p>
      ) : (
        ''
      )}
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
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLinks}>
          {/* 1 */}
          {!isMobile ? (
            <div>
              {renderFooterItem(
                companyLinks,
                <ArrowDownIcon />,
                'Для вас',
                'Для вас',
                isMobile
              )}
              {renderContactInfo()}
            </div>
          ) : (
            renderFooterItem(
              aboutUsLinks,
              <ArrowDownIcon />,
              'Про нас',
              'Про нас',
              isMobile
            )
          )}

          {/* 2 */}
          {!isMobile
            ? renderFooterItem(
                aboutUsLinks,
                <ArrowDownIcon />,
                'Про нас',
                'Про нас',
                isMobile
              )
            : renderFooterItem(
                supportLinks,
                <ArrowDownIcon />,
                'Допомога',
                'Допомога',
                isMobile
              )}

          {/* 3 */}
          {!isMobile
            ? renderFooterItem(
                supportFullLinks,
                <ArrowDownIcon />,
                'Допомога',
                'Допомога',
                isMobile
              )
            : renderFooterItem(
                companyLinks,
                <ArrowDownIcon />,
                'Для вас',
                'Для вас',
                isMobile
              )}

          {/* 4 */}
          <div>
            {!isMobile ? renderSocialIcons() : ''}
            {!isMobile ? renderBankIcons() : ''}
          </div>
        </div>

        <div className={styles.footerBox}>
          {!isMobile ? (
            ''
          ) : (
            <>
              {renderContactInfo()}
              <div className={styles.footerIconsContainers}>
                {renderSocialIcons()}
                {renderBankIcons()}
              </div>
            </>
          )}
        </div>
      </div>
      <Rectangle />

      <p className={styles.copy}>Copyright 2023 &copy; Бровко</p>
      <div className={styles.footerBottom}>
        {!isMobile ? <BrovkoFooterIcon /> : ''}
      </div>
    </footer>
  );
}

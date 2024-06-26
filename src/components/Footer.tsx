import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../theme/color';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled(Box)({
  backgroundColor: colors.primary,
  color: colors.text,
  padding: '10px 0',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
});

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <Typography variant="body2">
        {t('footer.text')}
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
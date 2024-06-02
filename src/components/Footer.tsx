// src/components/Footer.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../theme/color';

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
  return (
    <FooterContainer>
      <Typography variant="body2">
        © 2023 E&K Stock Genie. All rights reserved.
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
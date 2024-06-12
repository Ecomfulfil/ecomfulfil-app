import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';
import { Box, Container, Stack } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'black',
}));

export const Footer = () => {
  const { config } = useAuth();

  const links = [
    { href: '/support', text: 'Support' },
    { href: '/privacy-policy', text: 'Privacy Policy' },
    { href: '/terms-of-use', text: 'Terms of Use' },
  ];

  return (
    <Container sx={{ marginBottom: '100px', marginTop: '80px' }}>
      <Stack gap={3}>
        <Stack
          direction="row"
          justifyContent={{ md: 'center' }}
          gap={1}
        >
          {config?.links?.social?.map((link: any) => (
            <SocialIcon
              key={link}
              bgColor="black"
              style={{
                width: '25px',
                height: '25px',
                opacity: 0.8,
              }}
              url={link}
              target="_blank"
            />
          ))}
        </Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 1, md: 5 },
            alignItems: { xs: 'left', md: 'center' },
            justifyContent: 'center',
          }}
        >
          {links.map((link) => (
            <StyledLink key={link.href} href={link.href}>
              {link.text}
            </StyledLink>
          ))}
        </Box>
        <Typography variant="body2" color="grey" textAlign="center">
          Contact: support@ecomfulfil.store
        </Typography>
        <Typography variant="body2" color="grey" textAlign="center">
          © {new Date().getFullYear()} Ecomfulfil. All rights
          reserved.
        </Typography>
      </Stack>
    </Container>
  );
};

export default Footer;

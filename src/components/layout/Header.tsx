import React, { Fragment, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Button, Divider, Drawer, Typography } from '@mui/material';
import Link from 'next/link';
import AccountIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { usePopover } from '../hooks/usePopover';
import { AccountPopover } from './AccountPopover';

const Logo = () => (
  <Link href="/" passHref>
    <Typography
      variant="h4"
      component="a"
      sx={{ textDecoration: 'none', color: '#ffc107' }}
    >
      Ecomfulfil.
    </Typography>
  </Link>
);

const NavigationLinks = () => (
  <Box
    sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}
  >
    <Button href="/orders/create" sx={{ color: 'white' }}>
      Order
    </Button>
  </Box>
);

const AccountButtons = ({ user, accountPopover }: any) => (
  <>
    {user ? (
      <Button
        sx={{ color: 'white' }}
        onClick={accountPopover.handleOpen}
        ref={accountPopover.anchorRef}
        endIcon={<ExpandMoreIcon />}
        startIcon={<AccountIcon />}
      >
        Account
      </Button>
    ) : (
      <>
        <Button
          variant="outlined"
          size="small"
          href="/login"
          component={Link}
        >
          Sign in
        </Button>
        <Button
          variant="contained"
          size="small"
          href="/register"
          component={Link}
        >
          Join now
        </Button>
      </>
    )}
  </>
);

const MobileMenuButton = ({ handleMenuClick }: any) => (
  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
    <IconButton
      size="large"
      onClick={handleMenuClick}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
  </Box>
);

const DrawerContent = ({
  showAccountTab,
  setShowAccountTab,
  handleNavigation,
  handleSignOut,
  user,
}: any) => (
  <>
    {!showAccountTab ? (
      <>
        <MenuItem onClick={() => handleNavigation('/orders/create')}>
          <Typography fontSize={20}>Menu</Typography>
        </MenuItem>
        <Divider />
        {user ? (
          <MenuItem onClick={() => setShowAccountTab(true)}>
            <Typography fontSize={20}>Account</Typography>
          </MenuItem>
        ) : (
          <>
            <MenuItem onClick={() => handleNavigation('/login')}>
              <Typography fontSize={20}>Sign in</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/register')}>
              <Typography fontSize={20}>Join now</Typography>
            </MenuItem>
          </>
        )}
      </>
    ) : (
      <>
        <MenuItem onClick={() => setShowAccountTab(false)}>
          <ChevronLeftIcon />
          <Typography fontSize={20} fontWeight="bold">
            Account
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleNavigation('/account/history')}
        >
          <Typography fontSize={20}>History</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleNavigation('/account/personal')}
        >
          <Typography fontSize={20}>Personal info</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <Typography fontSize={20}>Sign out</Typography>
        </MenuItem>
      </>
    )}
  </>
);

const Header = () => {
  const router = useRouter();
  const [showNavigation, setShowNavigation] = useState(false);
  const [showAccountTab, setShowAccountTab] = useState(false);
  const { logout, user } = useAuth();
  const accountPopover = usePopover();

  const handleSignOut = () => {
    logout();
    router.push('/login');
    setShowNavigation(false);
    setShowAccountTab(false);
  };

  const handleMenuClick = () => {
    setShowNavigation(!showNavigation);
  };

  const handleCloseDrawer = () => {
    setShowNavigation(false);
  };

  const handleNavigation = (path: any) => {
    router.push(path);
    handleCloseDrawer();
  };

  return (
    <Fragment>
      <AppBar
        position="fixed"
        color="secondary"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar
            variant="dense"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Logo />
            <NavigationLinks />
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
              }}
              gap={1}
            >
              <AccountButtons
                user={user}
                accountPopover={accountPopover}
              />
            </Box>
            <MobileMenuButton handleMenuClick={handleMenuClick} />
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={showNavigation}
        onClose={handleCloseDrawer}
        sx={{ '& .MuiDrawer-paper': { width: '80%', top: 100 } }}
      >
        <DrawerContent
          showAccountTab={showAccountTab}
          setShowAccountTab={setShowAccountTab}
          handleNavigation={handleNavigation}
          handleSignOut={handleSignOut}
          user={user}
        />
      </Drawer>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </Fragment>
  );
};

export default Header;

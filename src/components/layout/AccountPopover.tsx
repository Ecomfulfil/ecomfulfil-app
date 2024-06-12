import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Divider, MenuItem, MenuList, Popover } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

export const AccountPopover = (props: any) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const { logout } = useAuth();

  const handleSignOut = useCallback(() => {
    onClose?.();
    logout();
    router.push('/login');
  }, [onClose, router, logout]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
    >
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={() => router.replace('/account/history')}>
          History
        </MenuItem>
        <MenuItem onClick={() => router.replace('/account/personal')}>
          Personal info
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

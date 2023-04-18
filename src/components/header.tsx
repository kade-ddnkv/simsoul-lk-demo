import React from 'react';
import { styled, Link, Divider, AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useUser } from '@/auth/useUser';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useRouter } from 'next/router'

const OutlinedButton = styled(Button)({
  borderColor: 'white',
  borderRadius: 0,
  color: 'black',
  ':hover': {
    // backgroundColor: '#fafafa',
    backgroundColor: '#ffffff',
    borderColor: 'black',
  }
})

const ButtonLikeLink = styled(Link)({
  color: 'black',
  fontSize: '14px',
  fontWeight: 500
})

export default function Header(props: {
  useHomeButton: boolean,
  mainText: string,
  isBold: boolean,
  noLine?: boolean,
  noRight?: boolean,
}) {
  const { user, logout } = useUser()
  const router = useRouter()

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", minHeight: '36.5px' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
          '& hr': {
            mx: 2,
          },
          ml: 1,
        }}>
          {props.useHomeButton && <>
            {/* <Typography component='div'><Box sx={{ fontSize: '14px', fontWeight: 500 }}>Home</Box></Typography> */}
            <Typography component='div'>
              <ButtonLikeLink href='/' underline='none'>
                Home
              </ButtonLikeLink>
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: 'black', borderRightWidth: 1 }} />
          </>}
          <Typography component='div'><Box sx={props.isBold ? { fontWeight: 'bold' } : {}}>{props.mainText}</Box></Typography>
        </Box>
        {!props.noRight &&
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user && <Typography sx={{ fontSize: '14px', mr: 4 }}>Account: {user?.email}</Typography>}
            <OutlinedButton variant='outlined' onClick={() => router.push('/feedback')}>Leave feedback</OutlinedButton>
            {user
              ? <OutlinedButton sx={{ ml: 1 }} variant='outlined' onClick={() => firebase.auth().signOut().then(logout)}>Sign out</OutlinedButton>
              : <OutlinedButton sx={{ ml: 1 }} variant='outlined' onClick={() => router.push('/signin')}>Sign in</OutlinedButton>}
          </Box>
        }
      </Box>
      {!props.noLine &&
        <hr
          style={{
            marginTop: 8,
            backgroundColor: 'black',
            height: 1
          }}
        />
      }
    </>
  );
}
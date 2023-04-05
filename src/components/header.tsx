import React from 'react';
import { styled, Link, Divider, AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';

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
}) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
        <Box>
          <OutlinedButton variant='outlined'>Leave feedback</OutlinedButton>
          <OutlinedButton sx={{ ml: 1 }} variant='outlined'>Sign out</OutlinedButton>
        </Box>
      </Box>
      <hr
        style={{
          marginTop: 8,
          backgroundColor: 'black',
          height: 1
        }}
      />
    </>
  );
}
import { useState } from 'react'
import { Grid, Link, Box, Container, TextField, Typography } from '@mui/material'
import { HeaderText, HoverBlackButton, StyledTextField } from '@/components/generalComponents'
import router from 'next/router'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useUser } from '@/auth/useUser'
import Header from '@/components/header';

export default function SignIn() {
  // const { user, logout } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function onSubmit(event) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // router.push('/')
      })
      .catch((error) => {
        console.log(error)
      });
    event.preventDefault()
  }

  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Header mainText='simsoul demo' noLine noRight useHomeButton={false} isBold={false} />
      </Container>
      <Container maxWidth='xs' sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box component='form' onSubmit={onSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <HeaderText sx={{ ml: 'auto', mr: 'auto' }}>SIGN UP</HeaderText>
          <StyledTextField
            sx={{ mt: 2 }}
            fullWidth
            size="small"
            label="Email"
            variant="outlined"
            onChange={handleEmailChange} />
          <StyledTextField
            sx={{ mt: 2 }}
            fullWidth
            size="small"
            label="Password"
            variant="outlined"
            onChange={handlePasswordChange} />
          <HoverBlackButton type='submit' sx={{ mt: 2 }} fullWidth variant='outlined'>Sign up</HoverBlackButton>
          {/* <Typography sx={{mt: 2, fontSize: '14px'}}>You will receive an email to complete the registration.</Typography> */}
          {/* <Link sx={{ mt: 2 }} href='/signin' underline='none'><Typography sx={{ color: 'black', fontSize: '14px' }}>Already have an account?</Typography></Link> */}
          <Link sx={{ mt: 2 }} href='/signin'><Typography sx={{ fontSize: '14px' }}>Already have an account?</Typography></Link>
          <Link sx={{ mt: 10, mb: -12 }} href='/info'><Typography sx={{ fontSize: '14px' }}>What is the purpose of this demo and how to use it?</Typography></Link>
        </Box>
      </Container>
    </>
  )
}
import { useState, useEffect } from 'react'
import { Grid, Link, Box, Container, TextField, Typography } from '@mui/material'
import { HeaderText, HoverBlackButton, StyledTextField } from '@/components/generalComponents'
import { useRouter } from 'next/navigation'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useUser } from '@/auth/useUser'
import Header from '@/components/header';

export default function SignIn() {
  // const { user, logout } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function onSubmit(event) {
    event.preventDefault()
    console.log('submit')
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log(authUser)
        // router.push('/')
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Header mainText='simsoul demo' noLine noRight useHomeButton={false} isBold={false} />
      </Container>
      <Container maxWidth='xs' sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box component='form' autoComplete='off' onSubmit={onSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <HeaderText sx={{ ml: 'auto', mr: 'auto' }}>SIGN IN</HeaderText>
          <StyledTextField
            sx={{ mt: 2 }}
            fullWidth
            size="small"
            label="Email"
            variant="outlined"
            onChange={(event) => {
              console.log('email')
              setEmail(event.target.value)
            }} />
          <StyledTextField
            sx={{ mt: 2 }}
            fullWidth
            size="small"
            label="Password"
            variant="outlined"
            onChange={(event) => {
              console.log('password')
              setPassword(event.target.value)
            }} />
          <HoverBlackButton type='submit' sx={{ mt: 2 }} fullWidth variant='outlined'>Sign in</HoverBlackButton>
          <Link sx={{ mt: 2 }} href='/signup' underline='none'><Typography sx={{ color: 'black', fontSize: '14px' }}>Don't have an account?</Typography></Link>
          <Link sx={{ mt: 10, mb: -12 }} href='/info' underline='none'><Typography sx={{ color: 'black', fontSize: '14px' }}>What is the purpose of this demo and how to use it?</Typography></Link>
        </Box>
      </Container>
    </>
  )
}
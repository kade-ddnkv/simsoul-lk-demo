import { useState } from 'react'
import { Grid, Box, Container, TextField } from '@mui/material'
import { HeaderText, HoverBlackButton, StyledTextField } from '@/components/generalComponents'
import router from 'next/router'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useUser } from '@/auth/useUser'

export default function SignIn() {
  const { user, logout } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function onSubmit(event) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(authUser => {
        router.push('/');
      })
    event.preventDefault()
  }

  return (
    <Container maxWidth='xs' sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box component='form' onSubmit={onSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <HeaderText sx={{ ml: 'auto', mr: 'auto' }}>SIGN IN</HeaderText>
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
        <HoverBlackButton type='submit' sx={{ mt: 2 }} fullWidth variant='outlined'>Sign in</HoverBlackButton>
      </Box>
    </Container>
  )
}
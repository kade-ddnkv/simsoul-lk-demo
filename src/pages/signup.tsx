import { useState } from 'react'
import { Grid, Link, Box, Container, TextField, Typography, FormControlLabel, Checkbox, FormHelperText, FormControl } from '@mui/material'
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
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
  const [emailError, setEmailError] = useState(false)
  const [emailHelperText, setEmailHelperText] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordHelperText, setPasswordHelperText] = useState('')
  const [agreeChecked, setAgreeChecked] = useState(false)
  const [agreeCheckHelperText, setAgreeCheckHelperText] = useState('')

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function validateRegistration() {
    let bad = false
    if (email == '') {
      setEmailError(true)
      setEmailHelperText("Email cannot be empty")
      bad = true
    } else {
      setEmailError(false)
      setEmailHelperText("")
    }
    if (password == '') {
      setPasswordError(true)
      setPasswordHelperText("Password cannot be empty")
      bad = true
    } else {
      setPasswordError(false)
      setPasswordHelperText("")
    }
    if (agreeChecked == false) {
      setAgreeCheckHelperText('You should agree to proceed')
      bad = true
    } else {
      setAgreeCheckHelperText('')
    }
    if (bad === true) {
      return false
    }
    return true
  }

  function onSubmit(event) {
    if (validateRegistration()) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // router.push('/')
        })
        .catch((error) => {
          alert(error)
        });
    }
    event.preventDefault()
  }

  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Header mainText='Customer selfcare demo of the 5G slicing functions' noLine noRight useHomeButton={false} isBold={false} />
      </Container>
      <Container maxWidth='xs' sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box component='form' onSubmit={onSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <HeaderText sx={{ ml: 'auto', mr: 'auto' }}>CREATE ACCOUNT</HeaderText>
          <StyledTextField
            sx={{ mt: 4 }}
            fullWidth
            size="small"
            label="Email"
            variant="outlined"
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailHelperText}
          />
          <StyledTextField
            sx={{ mt: 2 }}
            fullWidth
            size="small"
            label="Password"
            variant="outlined"
            type='password'
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={passwordHelperText}
          />
          <Box sx={{ width: '100%', mt: 3 }}>
            <FormControlLabel control={
              <Checkbox
                value={agreeChecked}
                onChange={(event) => setAgreeChecked(event.target.checked)}
                icon={<CheckBoxOutlineBlankSharpIcon />}
                checkedIcon={<CheckBoxSharpIcon />}
                style={{ color: 'black' }}
                sx={{ borderRadius: 0 }} />
            } label={
              <Box>
                <Typography sx={{ fontSize: '14px' }}>I hereby agree to process my email address</Typography>
                <Typography sx={{ fontSize: '14px' }}>to create the account for 5g slicing demo page</Typography>
              </Box>} />
          </Box>
          <FormControl sx={{ width: '100%' }} error>
            <FormHelperText sx={{ marginLeft: '32px' }}>{agreeCheckHelperText}</FormHelperText>
          </FormControl>
          <HoverBlackButton type='submit' sx={{ mt: 3 }} fullWidth variant='outlined'>Create account</HoverBlackButton>
          <Link sx={{ mt: 1 }} href='/signin'><Typography sx={{ fontSize: '14px' }}>Already have an account?</Typography></Link>
          <Link sx={{ mt: 10, mb: -12 }} href='/info'><Typography sx={{ fontSize: '14px' }}>What is the purpose of this demo and how to use it?</Typography></Link>
        </Box>
      </Container>
    </>
  )
}

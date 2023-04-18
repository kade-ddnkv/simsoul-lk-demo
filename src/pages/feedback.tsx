import { useState } from 'react'
import { Grid, Link, Stack, Box, Container, TextField, Typography } from '@mui/material'
import { HeaderText, HoverBlackButton, StyledTextField } from '@/components/generalComponents'
import router from 'next/router'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useUser } from '@/auth/useUser'
import Header from '@/components/header';

export default function LeaveFeedback() {
  const [feedbackText, setFeedbackText] = useState('')

  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Header mainText='simsoul demo' noLine noRight useHomeButton={true} isBold={false} />
      </Container>
      <Container maxWidth='lg' sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Stack component={Container} spacing={2} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'  }}>
          <Container maxWidth='xs' sx={{ display: 'flex', alignItems: 'center' }}>
            <HeaderText sx={{ ml: 'auto', mr: 'auto' }}>Your feedback on demo</HeaderText>
          </Container>
          <Container maxWidth={false} style={{maxWidth: '750px'}} sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledTextField
              sx={{ width: '100%' }}
              minRows={10}
              maxRows={20}
              label=''
              defaultValue=''
              multiline
            />
          </Container>
          <Container maxWidth='xs'>
            <HoverBlackButton type='submit' fullWidth variant='outlined'>Send feedback</HoverBlackButton>
          </Container>
        </Stack>
      </Container>
    </>
  )
}
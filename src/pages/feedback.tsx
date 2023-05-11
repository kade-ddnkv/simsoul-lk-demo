import { useState } from 'react'
import { Grid, Link, Stack, Box, Container, TextField, Typography } from '@mui/material'
import { HeaderText, HoverBlackButton, StyledTextField } from '@/components/generalComponents'
import router from 'next/router'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useUser } from '@/auth/useUser'
import Header from '@/components/header';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next'
import { serverSideAuthCheck } from '@/auth/serverSideAuthCheck'
import { useAuth } from '@/auth/authUserContext'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return serverSideAuthCheck(context)
}

export default function LeaveFeedback() {
  const { user } = useAuth()
  const [feedbackText, setFeedbackText] = useState('')

  const postFeedbackToEmail = async () => {
    try {
      const response = await axios.post('/api/sendEmail', {
        subject: 'Feedback on simsoul-lk-demo',
        message: feedbackText + '\n\n-------------------------\n\nfrom user: ' + user.email,
      });
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Header mainText='Customer selfcare demo of the 5G slicing functions' noLine useHomeButton={true} isBold={false} />
      </Container>
      <Container maxWidth='lg' sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Stack component={Container} spacing={2} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Container maxWidth='xs' sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ ml: 'auto', mr: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <HeaderText>Please leave your feedback</HeaderText>
              <HeaderText>about this 5G slicing selfcare demo</HeaderText>
            </Box>
          </Container>
          <Container maxWidth={false} style={{ maxWidth: '750px' }} sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledTextField
              sx={{ width: '100%' }}
              minRows={10}
              maxRows={20}
              label=''
              defaultValue=''
              multiline
              onBlur={(event) => setFeedbackText(event.target.value)}
            />
          </Container>
          <Container maxWidth='xs'>
            <HoverBlackButton onClick={postFeedbackToEmail} fullWidth variant='outlined'>Send feedback</HoverBlackButton>
          </Container>
        </Stack>
      </Container>
    </>
  )
}

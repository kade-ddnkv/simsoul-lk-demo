import { Stack, Box, Link, Container, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material';
import Header from '@/components/header';
import image3GppSlicing from '../../public/img/3gpp_slicing.jpg'
import Image from 'next/image'

export default function infoPage() {
  return (
    <Container maxWidth='xl' sx={{ mt: 2 }}>
      <Header mainText='simsoul demo' noLine useHomeButton={false} isBold={false} />
      <Container maxWidth='md' sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.8rem', mt: 6, mb: 6, ml: 2 }}>The purpose of this demo</Typography>
        <Box sx={{ border: 1, pl: 3, pr: 8, py: 5, mb: 8 }}>
          <Stack spacing={5}>
            <Box>
              <Typography>Network slicing is a new method of  creating  unique logical and virtualized networks over a common  infrastructure in the 5G networks.</Typography>
            </Box>
            <Typography>We believe that network slicing will shortly become a popular function available for mobile subscribers. And network slicing creating, modifing and deleting options would be available for self-service with a common (corporate) subscriber account management system.</Typography>
            <Image style={{ maxWidth: '100%', height: 'auto' }} src={image3GppSlicing} alt="3GPP deployments using network slicing" placeholder='blur' />
            <Box>
              <Typography>The purpose of this demo is to show one of the way how network slicing self-service can be done.</Typography>
            </Box>
            <Box>
              <Typography>Please use "Create account" option to create the account with your email and some password. No activation or additional steps is required - you can use your account right after creation.</Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Container>
  )
}
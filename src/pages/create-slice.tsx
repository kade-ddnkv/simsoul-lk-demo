import Head from 'next/head';
import Header from '@/components/header';
import { Box, Container } from '@mui/material';
import TabsCreate from '@/components/tabs-create';

export default function SlicePage() {
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Header mainText='Creating a new slice' useHomeButton={true} isBold={true} />
        <Box sx={{ mt: 4 }}>
          <TabsCreate />
        </Box>
      </Container>
    </>
  );
}  
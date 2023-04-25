import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { Divider, Link, Box, Container, AppBar, Toolbar, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { alpha } from "@mui/material";
import VerticalTabs from '@/components/tabs';
import Header from '@/components/header';
import { useRouter } from 'next/router'
import TabsSettings from '@/pages/tabs/TabsSettings';
import { serverSideAuthCheck } from '@/auth/serverSideAuthCheck';
import { MyContext, MyContextProvider } from '@/context/myContext';
import { GetServerSidePropsContext } from 'next';
import { useUser } from '@/auth/useUser';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { useAuth } from '@/auth/authUserContext';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return serverSideAuthCheck(context)
}

export default function SlicePage() {
  const router = useRouter();
  const { user } = useAuth()
  const { slice } = router.query;

  const [changesHappened, setChangesHappened] = useState(false)

  const { setSliceName } = useContext(MyContext)
  const { setSelectedRadio } = useContext(MyContext)
  const { setSelectedCore } = useContext(MyContext)

  function setContext() {
    if (!changesHappened) {
      if (user) {
        var slicesFullRef = firebase.database().ref('slices_preview/' + user?.id + '/' + slice);
        slicesFullRef.on('value', (snapshot) => {
          const data = snapshot.val()
          if (data) {
            setSliceName(data.name)
            setSelectedRadio(data.radio)
            setSelectedCore(data.core)
          }
        });
        return () => {
          slicesFullRef.off('value');
        };
      }
    }
  }

  useEffect(() => {
    setContext()
  }, [user])

  return (
    <>
      <Head>
        <title>{slice + ' / Settings'}</title>
      </Head>
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Header mainText={(slice ? slice : '') + ' / Settings'} useHomeButton={true} isBold={true} />
        <Box sx={{ mt: 4 }}>
          {user
            ? <TabsSettings />
            : <Typography>Loading...</Typography>
          }
        </Box>
      </Container>
    </>
  );
}

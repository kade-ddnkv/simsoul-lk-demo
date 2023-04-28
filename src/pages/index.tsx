import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Link, Container, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { alpha } from "@mui/material";
import Header from '@/components/header';
import withAuth from '@/auth/withUser';
// import Link from 'next/link';
import { serverSideAuthCheck } from '@/auth/serverSideAuthCheck';
import { GetServerSidePropsContext } from 'next';
import { useUser } from '@/auth/useUser';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { useAuth } from '@/auth/authUserContext';
import AddIcon from '@mui/icons-material/Add';

import dayjs from 'dayjs';
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

interface RowData {
  id: number;
  name: string;
  age: number;
  email: string;
  address: string;
}

const rows: RowData[] = [
  { id: 1, name: 'John Doe', age: 30, email: 'john.doe@example.com', address: '123 Main St' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane.smith@example.com', address: '456 Oak Ave' },
  { id: 3, name: 'Bob Johnson', age: 40, email: 'bob.johnson@example.com', address: '789 Maple Blvd' },
];

const CreateButton = styled(Button)({
  borderColor: alpha('#000000', 0.12),
  borderRadius: 0,
  color: 'black',
  ':hover': {
    backgroundColor: '#fafafa',
    borderColor: 'black',
  }
})

const StyledTableCell = styled(TableCell)({
  fontWeight: 600,
})

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return serverSideAuthCheck(context)
}

const IndexPage = () => {
  const { user } = useAuth()

  const [slicesPreview, setSlicesPreview] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      var slicesPreviewRef = firebase.database().ref('slices_preview/' + user?.id);
      slicesPreviewRef.on('value', (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setSlicesPreview(Object.values(data))
        }
      });
      return () => {
        slicesPreviewRef.off('value');
      };
    }
  }, [user])

  const sliceType = (slice) => {
    if (slice.radio.type != 'nothing' && slice.core.type != 'nothing') {
      return 'radio + core'
    } else if (slice.radio.type == 'nothing' && slice.core.type != 'nothing') {
      return 'core'
    } else if (slice.radio.type != 'nothing') {
      return 'radio'
    } else {
      return 'nothing???'
    }
  }

  const sliceRunning = (slice) => {
    let afterStartDate = dayjs().isSameOrAfter(slice.time.startDate, 'day')
    let beforeEndDate = dayjs().isBefore(slice.time.endDate, 'day')
    if (!afterStartDate) {
      return 'not started yet'
    } else if (afterStartDate && beforeEndDate) {
      return 'running'
    } else {
      return 'finished working'
    }
  }

  return (
    <>
      <Head>
        <title>My Slices</title>
      </Head>
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Header mainText='Your personal slices' useHomeButton={false} isBold={true} />
        <CreateButton href='/create-slice' variant='outlined' sx={{ mt: 6 }}>
          + Create new
        </CreateButton>
        <Paper sx={{ mt: 2, mx: 'auto', borderRadius: 0 }} variant='outlined' elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Running</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Geography</StyledTableCell>
                <StyledTableCell align="right">Start at</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicesPreview.map((slice) => (
                <TableRow key={slice.name}>
                  <TableCell>
                    <Link href={'/slice/' + slice.name} underline='none'>
                      {slice.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{sliceRunning(slice)}</TableCell>
                  <TableCell align="right">{sliceType(slice)}</TableCell>
                  <TableCell align="right">{slice.geography.type}</TableCell>
                  <TableCell align="right">{dayjs(slice.time.startDate).format('DD/MM/YYYY')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </>
  );
}

export default IndexPage;
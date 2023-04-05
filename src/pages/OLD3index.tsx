import { useState } from 'react';
import Head from 'next/head';
import { createTheme, Link, Box, Container, AppBar, Toolbar, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { alpha } from "@mui/material";
import Header from '@/components/header';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
  fontWeight: 600
})

export default function IndexPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar> */}
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Header mainText='Your personal slices' useHomeButton={false} isBold={true} />
        <CreateButton variant='outlined' sx={{ mt: 6 }}>+ Create new</CreateButton>
        <Paper sx={{ mt: 2, mx: 'auto', borderRadius: 0 }} variant='outlined' elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <StyledTableCell align="right">Running</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Geography</StyledTableCell>
                <StyledTableCell align="right">Started</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} selected={selectedRows.includes(row.id)}>
                  <TableCell>
                    <Link href='/slice' underline='none'>
                      {row.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </>
  );
}

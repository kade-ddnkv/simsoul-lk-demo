import { useState } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

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

export default function IndexPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleRowClick = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Button variant="outlined" sx={{ mt: 2, ml: 2,  }}>
        My Button
      </Button>
      <Paper sx={{ borderRadius: 0, mt: 2, mx: 'auto', boxShadow: 0  }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} selected={selectedRows.includes(row.id)} onClick={() => handleRowClick(row.id)}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

import { useState } from 'react';
import Head from 'next/head';
import { Divider, Link, Box, Container, AppBar, Toolbar, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { alpha } from "@mui/material";
import VerticalTabs from '@/components/tabs';
import Header from '@/components/header';

export default function SlicePage() {
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Header mainText='slice_name_1 / Settings' useHomeButton={true} isBold={true} />
        <Box sx={{ mt: 4 }}>
          <VerticalTabs />
        </Box>
      </Container>
    </>
  );
}

import { Stack, Box, Link, Container, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material';
import Header from '@/components/header';

export default function infoPage() {
  return (
    <Container maxWidth='xl' sx={{ mt: 2 }}>
      <Header mainText='simsoul demo' noLine useHomeButton={false} isBold={false} />
      <Container maxWidth='md' sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.8rem', mt: 6, mb: 6, ml: 2 }}>What is the purpose of this demo?</Typography>
        <Box sx={{ border: 1, pl: 3, pr: 8, py: 5, mb: 8 }}>
          <Stack spacing={8}>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>Quisque pharetra aliquet nulla</Typography>
              <br />
              <Typography>Praesent id dapibus neque. Praesent semper dui id turpis vestibulum scelerisque. Sed maximus arcu ut velit dapibus.</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>Maecenas et lectus malesuada</Typography>
              <br />
              <Typography>Donec turpis nulla, efficitur vitae libero eget, facilisis consectetur sem. Etiam arcu diam, semper quis eros non, laoreet feugiat erat. Aenean tincidunt porttitor hendrerit. Ut sagittis nisl nibh, id facilisis magna venenatis vitae.</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Stack direction='row' spacing={2}>
                <Box sx={{ backgroundColor: '#f4f4f4', width: '200px', height: '200px' }}></Box>
                <Box sx={{ backgroundColor: '#f4f4f4', width: '200px', height: '200px' }}></Box>
              </Stack>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>Aenean finibus nunc odio</Typography>
              <br />
              <Typography>Phasellus facilisis, lacus in consectetur porta, diam sem commodo massa, ac fringilla elit risus ac ipsum. Nunc ornare, massa vitae pharetra ornare, velit mi dapibus odio, ut malesuada orci metus sit amet odio. Fusce pretium gravida nisi sed egestas. Mauris gravida nibh nisl. Ut sollicitudin elit id ipsum lobortis dignissim. Sed euismod erat mi, vel tristique leo placerat sit amet. Quisque sed congue magna.</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>Contacts</Typography>
              <br />
              <Typography>Proin eu convallis magna, eget suscipit leo.</Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Container>
  )
}
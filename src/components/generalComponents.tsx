import { styled, Typography, Button } from '@mui/material';

const HeaderText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem'
})

const StyledButton = styled(Button)({
  borderColor: 'black',
  borderRadius: 0,
  color: 'black',
  ':hover': {
    backgroundColor: '#f0f0f0',
    borderColor: 'black',
  }
})

export { HeaderText, StyledButton }
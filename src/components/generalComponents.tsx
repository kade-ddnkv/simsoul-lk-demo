import { styled, Typography, Button, TextField, Box, alpha } from '@mui/material';

const HeaderText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem'
})

const StyledButton = styled(Button)({
  // borderColor: 'black',
  // borderRadius: 0,
  // color: 'black',
  // ':hover': {
  //   backgroundColor: '#f0f0f0',
  //   borderColor: 'black',
  // }
  borderColor: alpha('#000000', 0.12),
  borderRadius: 0,
  color: 'black',
  ':hover': {
    backgroundColor: '#fafafa',
    borderColor: 'black',
  }
})

const HoverBlackButton = styled(Button)({
  borderColor: 'black',
  borderRadius: 0,
  color: 'black',
  ':hover': {
    color: 'white',
    backgroundColor: 'black',
    borderColor: 'black',
  }
})

const StyledTextField = styled(TextField)({
  // input label when focused
  "& label.Mui-focused": {
    color: 'black'
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: 'black'
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: 'black'
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: 'black'
    }
  }
});

const BoxInsideRadio = styled(Box)({
  marginLeft: '31px',
  marginBottom: '48px',
})

export { HeaderText, StyledButton, StyledTextField, HoverBlackButton, BoxInsideRadio }
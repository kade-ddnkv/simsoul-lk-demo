import { styled, TableCell, Typography, Button, TextField, Box, alpha, Slider } from '@mui/material';

const StyledTableCell = styled(TableCell)({
  fontWeight: 600,
})

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
})

const ReadOnlyStyledTextField = styled(StyledTextField)({
  input: { color: alpha('#000000', 0.6) }
})

const BoxInsideRadio = styled(Box)({
  marginLeft: '31px',
  marginBottom: '48px',
})

const StyledSlider = styled(Slider)({
  '& .MuiSlider-thumb': {
    color: "black"
  },
  '& .MuiSlider-rail': {
    color: "#acc4e4"
  },
  // '& .MuiSlider-active': {
  //   color: "black"
  // },
  '& .MuiSlider-mark': {
    color: 'black'
  },
  '& .MuiSlider-thumb:hover': {
    boxShadow: 'none'
  },
  '& .MuiSlider-thumb.Mui-focusVisible:hover': {
    boxShadow: 'none'
  },
  '& .MuiSlider-thumb.Mui-active': {
    boxShadow: 'none'
  },
})

const StyledVerticalSlider = styled(StyledSlider)({
  '& .MuiSlider-markLabel': {
    transform: 'translateX(-200%) translateY(45%)'
  },
  '& .MuiSlider-markLabel[data-index="1"]': {
    transform: 'translateX(-170%) translateY(45%)'
  },
  marginRight: 0,
  marginLeft: 44,
})

export {
  StyledTableCell, HeaderText, StyledButton, StyledTextField, ReadOnlyStyledTextField, HoverBlackButton, BoxInsideRadio,
  StyledSlider, StyledVerticalSlider
}
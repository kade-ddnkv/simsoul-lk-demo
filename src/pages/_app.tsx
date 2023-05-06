import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from "next/font/local";
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { MyContextProvider } from '@/context/myContext';
import { AuthUserProvider } from '@/auth/authUserContext';

const customFont = localFont({
  src: "../../public/font/Inter-VariableFont_slnt,wght.ttf",
  display: "swap",
});


const theme = createTheme({
  typography: {
    fontFamily: customFont.style.fontFamily,
  },
  // components: {
  //   MuiSlider: {
  //     styleOverrides: {
  //       markLabel: {
  //         transform: "translateX(-100%)"
  //       },
  //     },
  //   }
  // },
  // components: {
  //   MuiSlider: {
  //     styleOverrides: {
  //       thumb: {
  //         '&$focused, &$activated, &$jumped, &:hover': {
  //           boxShadow: 'none',
  //         }
  //       },
  //     },
  //   }
  // },
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <MyContextProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </MyContextProvider>
    </AuthUserProvider>
  )
}

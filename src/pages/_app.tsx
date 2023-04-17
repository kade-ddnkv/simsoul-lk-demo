import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from "next/font/local";
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { MyContextProvider } from '@/context/myContext';

const customFont = localFont({
  src: "../../public/font/Inter-VariableFont_slnt,wght.ttf",
  display: "swap",
});


const theme = createTheme({
  typography: {
    fontFamily: customFont.style.fontFamily,
  },
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyContextProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </MyContextProvider>
  )
}

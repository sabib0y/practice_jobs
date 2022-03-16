import '../styles/globals.css'
import '../styles/test.css';
import "@fontsource/open-sans"
import "@fontsource/epilogue/300.css"
import "@fontsource/epilogue/600.css"
import "@fontsource/epilogue/800.css"
import "@fontsource/epilogue";
import "@fontsource/epilogue/700.css";
import type { AppProps } from 'next/app'
import { DataStateProvider } from '../lib/DataState';

function MyApp({ Component, pageProps }: AppProps) {
  return <DataStateProvider>
    <Component {...pageProps} />
  </DataStateProvider>
}

export default MyApp

import '../styles/globals.css'
import '../styles/test.css';
import type { AppProps } from 'next/app'
import { DataStateProvider } from '../lib/DataState';

function MyApp({ Component, pageProps }: AppProps) {
  return <DataStateProvider>
    <Component {...pageProps} />
  </DataStateProvider>
}

export default MyApp

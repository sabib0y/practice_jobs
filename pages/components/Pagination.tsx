import Head from 'next/head'
import Link from 'next/link'
import { useGlobalState } from '../lib/DataState';
import styles from '../../styles/Home.module.css';
import Container from '@mui/material/Container';

export default function Pagination({page, pageCount, setPageNumber}:any):any{
const { data:unfilteredData, isLoading, runSearch, searchOptions, filteredOptions } = useGlobalState();
const data = filteredOptions.length ? filteredOptions : unfilteredData
const count = data.length
const perPage = 12 
    return(
        <>
    <Head>
    <title>Search Results, page {page} of {pageCount}</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
  </Head>

<div className={styles.pagination_wrapper}>
        <button onClick={() => {setPageNumber(page - 1)}} aria-disabled={page <= 1}> Prev </button>
        <button onClick={() => {setPageNumber(page + 1)}} aria-disabled={page >= pageCount}> Next </button>
        <p>Page {page} of {pageCount}</p>
</div>

  </>
    )
}
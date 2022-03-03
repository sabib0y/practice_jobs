import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import styles from '../styles/Home.module.css';

const key = 'a44004e391a0422c9d41dc94bdc128af'
const url = 'https://api.nhs.scot/JobsSearch/v1.0.0/Vacancy/GetAllVacs'

const Home: NextPage = () => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [postNumber] = useState(5)

  const currentPageNumber = (pageNumber * postNumber) - postNumber
  const paginatedPosts = data.splice(currentPageNumber, postNumber)

  const handlePrev = () => {
    if (pageNumber === 1) return
    setPageNumber(pageNumber - 1)
  }
  const handleNext = () => {
    setPageNumber(pageNumber + 1)
  }

  useEffect(() => {
    setLoading(true)
    fetch(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': key
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        console.log(data);
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <>
      <Head>
        <title>Practice Jobs</title>
        <meta name="description" content="Practice jobs platform for NSH Scotland" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Container maxWidth="sm">
          <h1 className="text-3xl font-bold underline w-6">
            Hello world!
          </h1>

          <h2 style={{ textAlign: 'center', marginBottom: '40px' }} >All vacancies</h2>
          {paginatedPosts.map((item: any) => (
            <Card key={item.id} sx={{ minWidth: 275 }} className={styles.wide_card}>
              <CardContent>
                <h2>{item.title} </h2>
                <p>{item.location} </p>
                <p>{item.shortDescription} </p>
              </CardContent>
            </Card>
          ))}
        </Container>

      </main>

      <footer className={styles.footer}>
        <Container maxWidth="sm">

          <div className={styles.pagination}>
            <div>Page {pageNumber} </div>
            <div>
              <Button size="small" onClick={handlePrev}>Prev</Button>
              <Button size="small" onClick={handleNext}>Next</Button>
            </div>
          </div>

        </Container>

      </footer>
    </>
  )
}

export default Home

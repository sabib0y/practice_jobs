import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Container from '@mui/material/Container';
import styles from '../styles/Home.module.css';
import SearchBar from './components/SearchBar'

import Logo from './components/Logo';
import { useGlobalState } from '../lib/DataState';

const Home: NextPage = () => {

  const [featuredData, setFeaturedData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [isDataPulled, setIsDataPulled] = useState(false)
  const [postNumber] = useState(5)

  const [searchParams, setSearchParams] = useState({
    title: '',
    nhsBoard: '',
    jobFamily: '',
  });

  const [paginatedPosts, setPaginatedPosts] = useState([])
  const router = useRouter()
  const { data, isLoading, runSearch, filteredOptions } = useGlobalState();

  const generateRandomNumber = (data: any) => Math.floor(Math.random() * data.length);

  const getTwoFeaturedPosts = (data: any) => {
    let arr = [];
    arr.push(data[generateRandomNumber(data)])
    arr.push(data[generateRandomNumber(data)])
    return arr
  }

  const goToJobPage = () => router.push('/search')
  const runThis = () => { console.log('ping') }
  const clickHandler = () => {runSearch(searchParams)}

  const onInputChange = (e: any) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
  }

  const goToSearchWithJobString = (searchTerm : string) => {
    setSearchParams({
      title: searchTerm,
      nhsBoard: '',
      jobFamily: '',
    })
  }

  if(data.length && !isDataPulled){
    const featuredPosts: any = getTwoFeaturedPosts(data)
    console.log('featuredPosts',featuredPosts);
    
    setFeaturedData(featuredPosts)
    setPaginatedPosts(data.slice(0, 6))
    setIsDataPulled(true)
  }

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  if (data.length) {
    return (
      <>
        <Head>
          <title>Practice Jobs</title>
          <meta name="description" content="Practice jobs platform for NSH Scotland" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.overall_wrapper}>
          <main className={styles.main}>
            <div className={styles.hero}>
              <Logo />
              <Container>

                <div className={styles.hero_text}>
                  <h1>Practice Recruitment</h1>
                  <p>The NHS is <span className={styles.strong}>Scotland&apos;s biggest employer</span>.</p>
                  <p>
                    If you want the chance to make a real difference to people&apos;s lives
                    consider a career with NHS Scotland.
                  </p>

                </div>
                <SearchBar
                  onInputChange={onInputChange}
                  searchParams={searchParams}
                  clickHandler={clickHandler}
                  filteredOptions={filteredOptions}
                />
                <div className={styles.top_searches}>
                  <p>Top searches: 
                    Medical | GP | Dental | Nurse | Locum | Admin</p>
                </div>
              </Container>

            </div>


            <div className={styles.featured_jobs}>
              <Container>
                <h2>Featured Jobs</h2>
                <div className={styles.featured_jobs_inner}>
                  {featuredData.map((item: any, i: number) => (
                    <div className={styles.block} key={i}>
                      <Card sx={{ minWidth: 275 }} className={styles.wide_card} onClick={runThis}>
                        <CardContent>
                          <h4>{item.title} </h4>
                          <div className={styles.inner_block}>
                            <div className={styles.organisation}>
                              <span>Organisation</span>
                                <p>{ item.organisationName ? item.organisationName : 'NHS'} </p>
                              </div>
                            <div className={styles.closing_date}>
                              <span>Closing date</span>
                              <p>{new Date(item.closingDate).toLocaleDateString('en-US')} </p>
                            </div>
                            <div className={styles.location}>
                              <span>Address</span>
                              <p>{item.location} </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>)

                  )}
                </div>

              </Container>
            </div>

            <Container>

              <div className={styles.latest_vacancies}>
                <h2>Latest Vacancies</h2>
                <p>There are <strong>{data.length}</strong> vacancies listed, <span className={styles.view_all_link}><Link href='/search'>view all</Link></span></p>
                <div className={styles.block_wrapper}>

                  {paginatedPosts.map((item: any, i: number) => (
                    <div className={styles.block} key={i}>
                      <Card sx={{ minWidth: 275 }} className={styles.wide_card} onClick={runThis}>
                        <CardContent>
                          <h4>{item.title} </h4>
                          <div className={styles.inner_block}>
                            {item.organisationName?.length ? 
                              <p className={styles.org}>{item.organisationName} </p> : 
                              <p>NHS</p>
                            }                    
                            <p className={styles.closing_date}>{new Date(item.closingDate).toLocaleDateString('en-GB')} </p>
                            <p className={styles.location}>{item.location} </p>
                          </div>
                        </CardContent>

                      </Card>
                    </div>

                  ))}
                  <div className={styles.btn_wrapper}>
                    <button onClick={goToJobPage}>Show all vacancies </button>
                  </div>
                </div>
              </div>
            </Container>

          </main>

          <footer className={styles.footer}>
            <Container maxWidth="sm">


            </Container>

          </footer>
        </div>

      </>
    )
  } else {return null}
}

export default Home

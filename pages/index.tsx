import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import Link from 'next/link'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Container from '@mui/material/Container';
import styles from '../styles/Home.module.css';
import SearchBar from '../components/SearchBar'

import Logo from '../components/Logo';
import { useGlobalState } from '../lib/DataState';
import Footer from '../components/Footer';
import { relatedLinksData } from '../lib/relatedLinksData';
import { topSearchTerms } from '../utils/filterOptions';

const Home: NextPage = () => {
  const [featuredData, setFeaturedData] = useState([])
  const [isDataPulled, setIsDataPulled] = useState(false)
  const [searchParams, setSearchParams] = useState({
    title: '',
    nhsBoard: '',
    jobFamily: '',
  });

  const [paginatedPosts, setPaginatedPosts] = useState([])
  const { data, isLoading, runSearch, filteredOptions, goToPage } = useGlobalState();

  const generateRandomNumber = (data: any) => Math.floor(Math.random() * data.length);
  const generateRelatedLink = (links:any) => links[generateRandomNumber(links)]
  const getTwoFeaturedPosts = (data: any) => [1,2].map(i => data[generateRandomNumber(data)])

  const onInputChange = (e: any) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
  }

  const searchWithTopSearchTerm = (searchTerm: string) => {
    runSearch({
      title:searchTerm,
      nhsBoard: '',
      jobFamily: '',
    })
  }

  if(data.length && !isDataPulled){
    const featuredPosts: any = getTwoFeaturedPosts(data)
    
    setFeaturedData(featuredPosts)
    setPaginatedPosts(data.slice(0, 6))
    setIsDataPulled(true)
  }

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  if (data.length) {
    const rellatedLink = generateRelatedLink(relatedLinksData)
    
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
                <div className={styles.search_bg}>
                <SearchBar
                  onInputChange={onInputChange}
                  searchParams={searchParams}
                  clickHandler={() => {runSearch(searchParams)}}
                  filteredOptions={filteredOptions}
                />
                <div className={styles.top_searches}>
                  <p>Top searches: {
                      topSearchTerms.map((item, i) => (
                        <>
                        <span onClick={() => searchWithTopSearchTerm(item)} key={i}>{item}</span>
                        </>
                      ))
                    }</p>
                </div>

                </div>
              </Container>

            </div>


            <div className={styles.featured_jobs}>
              <Container>
                <h2>Featured Jobs</h2>
                <div className={styles.featured_jobs_inner}>
                  {featuredData.map((item: any, i: number) => {
                    return (
                    <div className={styles.block} key={i}>
                      <Card sx={{ minWidth: 275 }} className={styles.wide_card} onClick={() => { goToPage(item,'jobdetail') }}>
                        <CardContent>
                          <h4>{item.title} </h4>
                          <div className={styles.inner_block}>
                            <div className={styles.organisation}>
                              <span>Organisation</span>
                                <p>{ item.organisationName ? item.organisationName : 'NHS'} </p>
                              </div>
                              {
                                item.closingDate &&
                                <div className={styles.closing_date}>
                                <span>Closing date</span>
                                <p>{new Date(item.closingDate).toLocaleDateString('en-US')} </p>
                              </div>
                              }

                            <div className={styles.location}>
                              <span>Address</span>
                              <p>{item.location} </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>)}

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
                      <Card sx={{ minWidth: 275 }} className={styles.wide_card} onClick={() => { goToPage(item,'jobdetail') }}>
                        <CardContent>
                          <h4>{item.title} </h4>
                          <div className={styles.inner_block}>
                            {item.organisationName?.length ? 
                              <p className={styles.org}>{item.organisationName} </p> : 
                              <p>NHS</p>
                            }      
                            {
                              item.closingDate &&
                            <p className={styles.closing_date}>{new Date(item.closingDate).toLocaleDateString('en-GB')} </p>

                            }              
                            <p className={styles.location}>{item.location} </p>
                          </div>
                        </CardContent>

                      </Card>
                    </div>

                  ))}
                  <div className={styles.btn_wrapper}>
                    <button onClick={runSearch}>Show all vacancies </button>
                  </div>
                </div>
              </div>
            </Container>

            <div className={styles.related_links}>
            <Container>

            <h3>Related links</h3>
            </Container>

              <div className={styles.related_links_bg}>
            <Container>
              <div className={styles.related_links_wrapper}>

              {
              <a 
              className={styles.related_links_inner} 
              href={rellatedLink.link}
              rel="noopener noreferrer"
              >
                <div>
                  <h3>{rellatedLink.heading}</h3>
                  <p>{rellatedLink.body}</p>
                  <button>Find out more</button>
                </div>
              </a>
              }


              </div>

            </Container>
            </div>
              
            </div>

          </main>

          <Footer/>
        </div>

      </>
    )
  } else {return null}
}

export default Home

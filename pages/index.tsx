import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import logo from '../public/images/logo.svg'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Container from '@mui/material/Container';
import styles from '../styles/Home.module.css';
import SearchBar from './components/SearchBar'

// import useSWR from 'swr'

import Logo from './components/Logo';

const key = 'a44004e391a0422c9d41dc94bdc128af'
const url = 'https://api.nhs.scot/JobsSearch/v1.0.0/Vacancy/GetAllVacs'

const Home: NextPage = () => {
  const [data, setData] = useState([])
  const [featuredData, setFeaturedData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [postNumber] = useState(5)

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [searchParams, setSearchParams] = useState({
    title: '',
    nhsBoard: '',
    jobFamily: ''
  });

  const [paginatedPosts, setPaginatedPosts] = useState([])

  const currentPageNumber = (pageNumber * postNumber) - postNumber

  const router = useRouter()
  // const fetcher = (...args:any) => fetch(...args).then((res) => res.json())

  // const { data, error } = useSWR('/api/profile-data', fetcher)

  const generateRandomNumber = (data: any) => Math.floor(Math.random() * data.length);

  const getTwoFeaturedPosts = (data: any) => {
    let arr = [];
    arr.push(data[generateRandomNumber(data)])
    arr.push(data[generateRandomNumber(data)])
    return arr
  }

  const goToJobPage = () => router.push('/search')
  const runThis = () => { console.log('ping') }

  const onInputChange = (e: any) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
  }

  const searchParamss = (obj: any) => {
    const newObj: any = {}
    let newCat = ''
    for (const item in obj) {
      if (obj[item] !== '') {
        newObj[item] = obj[item]
      }
    }

    if (newObj.jobFamily && newObj.jobFamily.includes('&')) {
      newCat = newObj.jobFamily.replace('&', 'and')
    }

    const searchOptions: any = Object.entries(newObj)
    let filteredResults = data;

    console.log(searchOptions, 'searchOptions');
    console.log(filteredResults, 'filteredResults');


    for (let i = 0; i < searchOptions.length; i++) {

      filteredResults = filteredResults.filter((element: any) => {
        if (searchOptions[i][0] === 'title') {
          const lowerCaseData = element[searchOptions[i][0]].toLowerCase()
          const lowerCaseTitle = searchOptions[i][1].toLowerCase()
          if (lowerCaseData.includes(lowerCaseTitle)) {
            return element
          }
        } else if (searchOptions[i][0] === 'jobFamily') {
          if (searchOptions[i][1].includes('&')) {
            const convertedCategory = searchOptions[i][1].replace('&', 'and');
            return element[searchOptions[i][0]] === convertedCategory || element[searchOptions[i][0]] === searchOptions[i][1]
          }
        } else if (searchOptions[i][0] === 'nhsBoard') {
          const lowerCaseData = element[searchOptions[i][0]].toLowerCase()
          const lowerCaseTitle = searchOptions[i][1].toLowerCase()

          if (lowerCaseData.includes(lowerCaseTitle)) {
            return element
          }
        }

        return element[searchOptions[i][0]] === searchOptions[i][1]
      })
    }

    console.log(filteredResults, 'theNewValues');

    const searchPayload = {
      searchOptions,
      filteredResults
    }

    sessionStorage.setItem('searchPayload', JSON.stringify(searchPayload));

    router.push({
      pathname: '/search'
    })

  }



  useEffect(() => {
    setLoading(true)
    //check if data in LS is older than 5 mins
    const localData = sessionStorage.getItem('data')
    if (localData) {

    } else {
      //if it isnt make call
      fetch(url, {
        headers: {
          'Ocp-Apim-Subscription-Key': key
        }
      })
        .then((res) => res.json())
        .then((data) => {
          //update local storage
          const dataInfo = {
            data,
            time: Date.now()
          }

          // sessionStorage.setItem('data', JSON.stringify(dataInfo));
          setLoading(false)

          const featuredPosts: any = getTwoFeaturedPosts(data)
          setFeaturedData(featuredPosts)
          setPaginatedPosts(data.slice(0, 6))

        })
    }

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

      <div className={styles.overall_wrapper}>
        <main className={styles.main}>
          <div className={styles.hero}>
            <Logo />
            <Container>

              <div className={styles.hero_text}>
                <h1>Practice Recruitment</h1>
                <p>The NHS is <strong>Scotland&apos;s biggest employer</strong>.</p>
                <p>
                  If you want the chance to make a real difference to people&apos;s lives
                  consider a career with NHS Scotland.
                </p>

              </div>
              <SearchBar
                onInputChange={onInputChange}
                searchParams={searchParams}
                searchParamss={searchParamss}
              />
              <div className={styles.top_searches}>
                <p>Top searches: Medical | GP | Dental | Nurse | Locum | Admin</p>
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
                          {
                            item.organisationName &&
                            <div className={styles.organisation}>
                              <span>Organisation</span>
                              <p>{item.organisationName} </p>
                            </div>
                          }

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
              <p>There are <strong>{data.length}</strong> vacancies listed, view all</p>
              <div className={styles.block_wrapper}>

                {paginatedPosts.map((item: any, i: number) => (
                  <div className={styles.block} key={i}>
                    <Card sx={{ minWidth: 275 }} className={styles.wide_card} onClick={runThis}>
                      <CardContent>
                        <h4>{item.title} </h4>
                        <div className={styles.inner_block}>
                          <p className={styles.org}>{item.organisationName} </p>
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
}

export default Home

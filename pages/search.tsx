import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.css';
import SearchBar from './components/SearchBar'
import Logo from './components/Logo'
import { useGlobalState } from '../lib/DataState';
import Pagination from './components/Pagination';
import { useRouter } from 'next/router';

const key = 'a44004e391a0422c9d41dc94bdc128af'
const url = 'https://api.nhs.scot/JobsSearch/v1.0.0/Vacancy/GetAllVacs'

const Search: NextPage = () => {

  const [pageNumber, setPageNumber] = useState(1)
  const [paginatedResults, setPaginatedResults] = useState<any>([])

  const { data: unfilteredData, isLoading, runSearch, searchOptions, filteredOptions, setSelectedJob } = useGlobalState();
  const data = filteredOptions.length ? filteredOptions : unfilteredData

  const router = useRouter()
  const perPage = 12
  
  const { title, nhsBoard, jobFamily } = searchOptions
  let pageCount = Math.ceil(data.length / perPage)
  pageCount = pageCount === 0 ? 1 : pageCount

  const [searchParams, setSearchParams] = useState({
    title: title?.length ? title : '',
    nhsBoard: nhsBoard?.length ? nhsBoard : '',
    jobFamily: jobFamily?.length ? jobFamily : '',
  });

  const onInputChange = (e: any) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
  }

  const isDateValid = (date:any) => !!date?.length
  // const isDateValid = (date:any) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date) ? date : !!date.length

  const getPaginatedResults = () => {
    const customPageIndex = pageNumber > pageCount ? pageCount : pageNumber
    const targetIndex = (customPageIndex * perPage) - perPage
    return data.slice(targetIndex, (perPage * customPageIndex)) ?? []
  }

  const clickHandler = () => {
    runSearch(searchParams)
    setPageNumber(1)
  }

  useEffect(() => {
    router.prefetch('/jobdetail/')
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  if (data?.length) {
    return (
      <>
        <div className={styles.overall_wrapper}>

          <main className={styles.main}>
            <div className={styles.alt_header}>
              <Logo />

            </div>
            <Container className={styles.search_wrapper}>

              <h2>Search Results</h2>
              <p>There are <strong>{data.length}</strong> results that match your search</p>

              <SearchBar
                onInputChange={onInputChange}
                searchParams={searchParams}
                clickHandler={clickHandler}
              />
            </Container>
            <Container>


              <Pagination page={pageNumber} pageCount={pageCount} setPageNumber={setPageNumber} />

            </Container>

            <Container>
              <div className={styles.latest_vacancies}>
                <div className={styles.block_wrapper}>

                  {getPaginatedResults()?.map((item: any, i: number) => (
                    <div className={styles.block} key={i}>
                      <Card sx={{ minWidth: 275 }} className={styles.wide_card} onClick={() => {setSelectedJob(item)}}>
                        <CardContent>
                          <h4>{item.title} </h4>
                          <div className={styles.inner_block}>
                            {item.organisationName?.length ? <p className={styles.org}>{item.organisationName} </p> : <p className={styles.org}>NHS</p>}
                            {isDateValid(item.closingDate) && <p className={styles.closing_date}>{new Date(item.closingDate).toLocaleDateString('en-GB')} </p>}
                            <p className={styles.location}>{item.location} </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                  ))}
                </div>
              </div>
            </Container>

          </main>
          <Container>

          <Pagination page={pageNumber} pageCount={pageCount} setPageNumber={setPageNumber} />
          </Container>

        </div>

      </>
    )
  } else { return null }
}

export default Search



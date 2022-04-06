import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.css';
import SearchBar from '../components/SearchBar'
import Logo from '../components/Logo'
import { useGlobalState } from '../lib/DataState';
import Pagination from '../components/Pagination';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import { Popup } from 'reactjs-popup';
// import CloseIcon from '@mui/icons-material/Close';
import VacancyCard from '../components/Card';
import CircularProgress from '@mui/material/CircularProgress';

interface Props{
  open: boolean,
  setOpen: (e:boolean) => void
  onInputChange: any
  searchParams: any
  clickHandler: any
}

const ControlledPopup = ({open, setOpen, onInputChange, searchParams, clickHandler}:Props) => {
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Popup open={open} 
          position="center center" 
      onClose={closeModal}>
    <div className={styles.popup_search}>
        <span onClick={closeModal}>
        {/* <CloseIcon/> */}
        </span>
      <SearchBar
        onInputChange={onInputChange}
        searchParams={searchParams}
        clickHandler={clickHandler}
        />
    </div>

      </Popup>
    </div>

  );
};

const Search: NextPage = () => {

  const [pageNumber, setPageNumber] = useState(1)
  const [open, setOpen] = useState(false)

  const { data: unfilteredData, runSearch, searchOptions, filteredOptions, goToPage, error } = useGlobalState();
  const data = filteredOptions.length ? filteredOptions : unfilteredData

  const router = useRouter()
  const perPage = 12

  const { title, nhsBoard, jobFamily } = searchOptions
  let pageCount = Math.ceil(data?.length / perPage)
  pageCount = pageCount === 0 ? 1 : pageCount

  const [searchParams, setSearchParams] = useState({
    title: title?.length ? title : '',
    nhsBoard: nhsBoard?.length ? nhsBoard : '',
    jobFamily: jobFamily?.length ? jobFamily : '',
  });

  const onInputChange = (e: any) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
  }

  const isDateValid = (date: any) => !!date?.length

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
  }, [router])

  if (error) return <p> ...there is an error with fetching the data</p>

  if (data?.length) {
    return (
      <>
        <div className={styles.overall_wrapper}>
          <Container
           onClick={() => setOpen(!open)}
            className={styles.mobile_filter}
            >
            <span>Show search filters</span>
          </Container>
          <ControlledPopup 
            open={open}
            setOpen={setOpen}
            onInputChange={onInputChange}
            searchParams={searchParams}
            clickHandler={clickHandler}
          />
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
                        <VacancyCard item={item} key={i} />
                  ))}
                </div>
              </div>
            </Container>

          </main>
          <Container>

            <Pagination page={pageNumber} pageCount={pageCount} setPageNumber={setPageNumber} />
          </Container>
          <Footer />

        </div>

      </>
    )
  } else {       
    return(
    <div className={styles.loader_spinner}>
      <CircularProgress />
    </div>
    ) }
}

export default Search



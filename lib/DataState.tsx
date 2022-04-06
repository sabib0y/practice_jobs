import router from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { practiceJobsUrl } from "../utils/fetchUrls";
import { key } from "./constants";
import { faker } from '@faker-js/faker';
import useSWR from "swr"; 
import sample from './sample.json'
import { categories, regions, topSearchTerms } from '../utils/filterOptions.js'
import { generateRandomNumber } from "../utils/generators";

const LocalStateContext = createContext<any>({})

const LocalStateProvider = LocalStateContext.Provider

function DataStateProvider({ children }: any) {
  const [searchOptions, setSearchOptions] = useState({})
  const [filteredOptions, setFilteredOptions] = useState<any>([])
  const [topSearchTerm, setTopSearchTerm] = useState('')
  const [selectedJob, setSelectedJob] = useState<any>({})
  const [jobDetailInfo, setJobDetailInfo] = useState<any>({})


    const elasticIndex = 'practicejobs'
    const maxedOutJobLimit = 3000
    const url = `https://api.nhs.scot/JobsSearch/v1.0.0/ElasticJobsSearch/GetVacancySummaries`
    const allVacsUrl = `${url}/${elasticIndex}/${maxedOutJobLimit}`

    const defaultSearchOptions = {
      title: '',
      nhsBoard: '',
      jobFamily: '',
    }

  const getRandomCategoryAndRegion = () => {
    return({
      nhsBoard: categories[generateRandomNumber(categories)],
      jobFamily: regions[generateRandomNumber(regions)],
    })
  }

    const generateFillerVacancies = (number: number):any[] => {
      let arr = []

      for(let i:number = 0; i < number; i++){
        arr.push({
          uniqueID: faker.datatype.uuid(),
          title: topSearchTerms[generateRandomNumber(topSearchTerms)],
          jobFamily: getRandomCategoryAndRegion().jobFamily.label,
          organisationName: getRandomCategoryAndRegion().nhsBoard.label,
          closingDate: faker.datatype.datetime(),
          nhsBoard: getRandomCategoryAndRegion().nhsBoard.label,
          location: faker.address.city(),
          reference: faker.datatype.string(5),
          id: 0
        })
      }

      return arr
    }

    const data = generateFillerVacancies(150);
    
    const runSearch = (searchObj: any) => {
      const obj = searchObj !== undefined ? searchObj : defaultSearchOptions
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

        setSearchOptions(newObj)
    
        const searchOptions: any = Object.entries(newObj)
        let filteredResults = data;
    
        for (let i = 0; i < searchOptions.length; i++) {
          const key = searchOptions[i][0]
          const value = searchOptions[i][1]

          filteredResults = filteredResults.filter((element: any) => {

            if (key === 'title') {
              const lowerCaseData = element[key].toLowerCase()
              const lowerCaseTitle = value.toLowerCase()
              if (lowerCaseData.includes(lowerCaseTitle)) {
                return element
              }
            } else if (key === 'jobFamily') {
              if (value.includes('&')) {
                const convertedCategory = value.replace('&', 'and');
                return element[key] === convertedCategory || element[key] === value
              }
            } else if (key === 'nhsBoard') {
              const lowerCaseData = element[key].toLowerCase()
              const lowerCaseBoard = value.toLowerCase()
              if (lowerCaseData.includes(lowerCaseBoard)) {
                return element
              }
            }
    
            return element[key] === value
          })
        }

        setFilteredOptions(filteredResults)

        router.push({
          pathname: '/search'
        })
      }

      const goToPage = (item: any, page: string): void => {
        const path = item.reference ? item.reference : item.id
        router.push({
          pathname: `/${page}/${path}`
        })
      }

      useEffect(() => {
          if(selectedJob.jobFamily){
            let ref = selectedJob?.reference?.length? selectedJob.reference : selectedJob.id
            
          fetch(practiceJobsUrl(ref), {
            headers: {
              'Ocp-Apim-Subscription-Key': key
            }
          })
            .then((res) => res.json())
            .then((data) => {
              setJobDetailInfo(data[0])
            }).catch(function() {
              console.log("error");
          });
        }
    
      },[selectedJob])

    const fetcher = (url:string) => fetch(allVacsUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': key
      }
    }).then((res) => res.json())

    let error


    return <LocalStateProvider value= { {
        data,
        error,
        fetcher,
        searchOptions,
        setSearchOptions,
        runSearch,
        filteredOptions,
        setTopSearchTerm,
        setSelectedJob,
        jobDetailInfo,
        goToPage,
    } } >
        { children }
        </LocalStateProvider>
        
}

function useGlobalState(){
    const all = useContext(LocalStateContext);
    return all;
}

export {DataStateProvider, useGlobalState}
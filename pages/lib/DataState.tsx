import router from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const LocalStateContext = createContext<any>({})

const LocalStateProvider = LocalStateContext.Provider


function DataStateProvider({ children }: any) {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [searchOptions, setSearchOptions] = useState({})
    const [filteredOptions, setFilteredOptions] = useState([])

    const elasticIndex = 'practicejobs'
    const maxedOutLimit = 3000

    const key = 'a44004e391a0422c9d41dc94bdc128af'
    const url = `https://api.nhs.scot/JobsSearch/v1.0.0/ElasticJobsSearch/GetVacancySummaries/${elasticIndex}/${maxedOutLimit}`

    const runSearch = (obj: any) => {
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
              const lowerCaseBoard = searchOptions[i][1].toLowerCase()
              if (lowerCaseData.includes(lowerCaseBoard)) {
                return element
              }
            }
    
            return element[searchOptions[i][0]] === searchOptions[i][1]
          })
        }

        setFilteredOptions(filteredResults)

        router.push({
          pathname: '/search'
        })
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
              //update local storage
              const dataInfo = {
                data,
                time: Date.now()
              }
    
              // sessionStorage.setItem('data', JSON.stringify(dataInfo));
              setLoading(false)
              setData(data)                 
            })
    
      }, [])

    return <LocalStateProvider value= { {
        data,
        isLoading,
        searchOptions,
        setSearchOptions,
        runSearch,
        filteredOptions
    } } >
        { children }
        </LocalStateProvider>
        
}

function useGlobalState(){
    //consumer
    const all = useContext(LocalStateContext);
    return all;
}

export {DataStateProvider, useGlobalState}
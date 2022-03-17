import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import Container from '@mui/material/Container';
import styles from '../../styles/Home.module.css';

import Logo from '../../components/Logo';
import { useGlobalState } from '../../lib/DataState';
import { MarkerMap } from '../../components/MarkerMap'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const JobDetail: NextPage = () => {
    const { query: { id } } = useRouter()
    const {jobDetailInfo} = useGlobalState();

    console.log('jobDetailInfo',jobDetailInfo);
    
    const item = {
        geoLat: -56.1645,
        geoLong: -34.9011,
        location: 'location'
    }

    if(jobDetailInfo?.title){

    const {advertType, description, geoLong, geoLat, organisationName, title, postedDate, closingDate, salary, contractDuration, location} = jobDetailInfo
        let setOrganisationName = '';
    
        if(advertType === 'jobTrain'){
            setOrganisationName = location
        }else{
            setOrganisationName = organisationName
        }
        
    return (
        <>
            <div className={styles.overall_wrapper}>

                <main className={styles.main}>
                    <div className={styles.alt_header}>
                        <Logo />
                    </div>

                    <Container>
                        <div className={styles.job_detail}>
                            <div className={styles.heading_section}>
                                <h1>{title}</h1>
                                <div className={styles.meta_block}>
                                    <div className={styles.text_section}>
                                        <div className={styles.organisation}>
                                            <span>Organisation</span>
                                            {setOrganisationName ? 
                                            <p>{setOrganisationName}</p>:
                                            <p>NHS</p>
                                        }
                                        </div>
                                        <div className={styles.heading_section}>
                                            <div className={styles.meta_row}>
                                                <div className={styles.closing_date}>
                                                    <span>Posted on</span>
                                                    {postedDate ? 
                                            <p>{postedDate}</p>:
                                            <p>NA</p>
                                        }
                                                </div>
                                                <div className={styles.closing_date}>
                                                    <span>Closing date</span>
                                                    {closingDate ? 
                                            <p>{closingDate}</p>:
                                            <p>NA</p>
                                        }
                                                </div>
                                            </div>

                                        </div>
                                            <div className={styles.meta_row}>
                                                {
                                                    salary &&
                                                    <div className={styles.salary}>
                                                    <span>Salary</span>
                                                    <p>{salary}</p>
                                                </div>
                                                }
                                                {
                                                    contractDuration &&
                                                    <div className={styles.contract_type}>
                                                    <span>Contract type</span>
                                                    <p>{contractDuration}</p>
                                                </div>
                                                }

                                            </div>

                                        <div className={styles.location}>
                                            <span>Address</span>
                                            <p>{location}</p>
                                            <Popup 
                                            trigger={<p className={styles.map_trigger}>Click here to see map</p>} 
                                            position="center center"
                                            modal
                                            nested
                                            >
                                            <MarkerMap geoLat={geoLat} geoLong={geoLong} />

                                            </Popup>
                                        </div>

                                        {/* <div className={styles.job_pack}>
                                            <span>Job pack</span>
                                            <div>
                                                <button onClick={() => { console.log('coming soon!') }}>Download</button>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className={styles.map_container}>
                                        <div className={styles.map_wrapper}>
                                            {/* <MarkerMap geoLat={-56.1645} geoLong={-34.9011} /> */}
                                            <MarkerMap geoLat={55.835221} geoLong={-4.437821} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.description_block}>
                                {description}
                            </div>



                        </div>
                    </Container>

                </main>

            </div>

        </>
    )
}else{
    return null
}

}

export default JobDetail
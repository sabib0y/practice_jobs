import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import Container from '@mui/material/Container';
import styles from '../../styles/Home.module.css';

import Logo from '../components/Logo';
import { useGlobalState } from '../../lib/DataState';
import { MarkerMap } from '../components/MarkerMap'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const JobDetail: NextPage = () => {
    const { query: { id } } = useRouter()

    const item = {
        geoLat: -56.1645,
        geoLong: -34.9011,
        location: 'location'
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
                                <h1>Heading title goes here</h1>
                                <div className={styles.meta_block}>
                                    <div className={styles.text_section}>
                                        <div className={styles.organisation}>
                                            <span>Organisation</span>
                                            <p>NHS</p>
                                        </div>
                                        <div className={styles.heading_section}>
                                            <div className={styles.meta_row}>
                                                <div className={styles.closing_date}>
                                                    <span>Posted on</span>
                                                    <p>10/10/2020 </p>
                                                </div>
                                                <div className={styles.closing_date}>
                                                    <span>Closing date</span>
                                                    <p>10/10/2020 </p>
                                                </div>
                                            </div>
                                            <div className={styles.meta_row}>
                                                <div className={styles.salary}>
                                                    <span>Salary</span>
                                                    <p>£9.50 per hour</p>
                                                </div>
                                                <div className={styles.contract_type}>
                                                    <span>Contract type</span>
                                                    <p>Permanent</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div className={styles.location}>
                                            <span>Address</span>
                                            <p>Such and such, 123 zone</p>
                                            <Popup 
                                            trigger={<p className={styles.map_trigger}>Click here to see map</p>} 
                                            position="right center"
                                            modal
                                            nested
                                            >
                                            <MarkerMap geoLat={-56.1645} geoLong={-34.9011} />

                                            </Popup>
                                        </div>

                                        <div className={styles.job_pack}>
                                            <span>Job pack</span>
                                            <div>
                                                <button onClick={() => { console.log('coming soon!') }}>Download</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.map_container}>
                                        <div className={styles.map_wrapper}>
                                            <MarkerMap geoLat={-56.1645} geoLong={-34.9011} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.description_block}>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis at id distinctio dolor culpa iusto, nulla quisquam, perspiciatis a nihil nesciunt magni iure quibusdam, ipsa aspernatur. Quas quo nisi unde!</p>
                            </div>



                        </div>
                    </Container>

                </main>

            </div>

        </>
    )
}

export default JobDetail
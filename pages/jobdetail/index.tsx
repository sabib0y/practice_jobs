import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import Container from '@mui/material/Container';
import styles from '../../styles/Home.module.css';

import Logo from '../../components/Logo';
import { MarkerMap } from '../../components/MarkerMap'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Footer from '../../components/Footer';
import { practiceJobsUrl } from '../../utils/fetchUrls';
import { key } from '../../lib/constants';

const JobDetail: NextPage = () => {
    const { query: { id } }: any = useRouter()
    const [jobToDisplay, setJobToDisplay] = useState<any>({})
    const [isDataPulled, setIsDataPulled] = useState<boolean>(false)

    useEffect(() => {

        if (id && !isDataPulled) {
            const ref = id

            fetch(practiceJobsUrl(ref), {
                headers: {
                    'Ocp-Apim-Subscription-Key': key
                }
            })
                .then((res) => res.json())
                .then((data) => {

                    setJobToDisplay(data[0])
                    setIsDataPulled(true)
                }).catch(function () {
                    console.log("error");
                });
        }
    }, [id, isDataPulled])


    if (isDataPulled) {

        const {
            advertType,
            parentId,
            description,
            geoLong,
            geoLat,
            organisationName,
            title,
            postedDate,
            closingDate,
            salary,
            contractDuration,
            location,
            link
        } = jobToDisplay

        let setOrganisationName = '';

        if (advertType) {
            setOrganisationName = location
        } else {
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
                                                {parentId ?
                                                    <p><a className={styles.organisation_page_link} href={`/organisation/${parentId}`}>{setOrganisationName}</a></p> :
                                                    <p>{setOrganisationName}</p>
                                                }
                                            </div>
                                            {closingDate &&

                                                <div className={styles.heading_section}>
                                                    <div className={styles.meta_row}>
                                                        {postedDate &&
                                                            <div className={styles.closing_date}>
                                                                <span>Posted on</span>
                                                                <p>{postedDate}</p>
                                                            </div>
                                                        }
                                                        <div className={styles.closing_date}>
                                                            <span>Closing date</span>
                                                            <p>{closingDate}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            }
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
                                                {
                                                    geoLat?.length &&
                                                    <Popup
                                                        trigger={<p className={styles.map_trigger}>Click here to see map</p>}
                                                        position="center center"
                                                        modal
                                                        nested
                                                    >
                                                        <MarkerMap geoLat={geoLat} geoLong={geoLong} />
                                                    </Popup>
                                                }
                                            </div>
                                            {
                                                link?.length &&
                                                <div className={styles.link}>
                                                    <span>Link</span>
                                                    <p><a
                                                        href={link}
                                                        rel="noopener noreferrer"
                                                    >Click here to apply</a></p>
                                                </div>
                                            }
                                        </div>
                                        {
                                            geoLat?.length &&
                                            <div className={styles.map_container}>
                                                <div className={styles.map_wrapper}>
                                                    <MarkerMap geoLat={geoLat} geoLong={geoLong} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className={styles.description_block}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: description
                                        }}></div>
                                </div>

                            </div>
                        </Container>

                    </main>
                    <Footer />

                </div>

            </>
        )
    } else {
        return null
    }

}

export default JobDetail
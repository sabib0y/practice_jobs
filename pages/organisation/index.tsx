import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import Container from '@mui/material/Container';
import styles from '../../styles/Home.module.css';

import Logo from '../../components/Logo';
import { useGlobalState } from '../../lib/DataState';
import { MarkerMap } from '../../components/MarkerMap'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Footer from '../../components/Footer';
import { practiceJobsOrganisationsUrl } from '../../utils/fetchUrls';
import { key } from '../../lib/constants';

const Organisation: NextPage = () => {
    const { query: { id } }: any = useRouter()
    const { jobDetailInfo } = useGlobalState();
    const [jobToDisplay, setJobToDisplay] = useState<any>({})
    const [isDataPulled, setIsDataPulled] = useState<boolean>(false)

    console.log('jobDetailInfo', id);

    useEffect(() => {
        if (id && !isDataPulled) {
            console.log({ id });

            const ref = id

            fetch(practiceJobsOrganisationsUrl(ref), {
                headers: {
                    'Ocp-Apim-Subscription-Key': key
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('return', data);

                    //   const filteredData = data.find((item:any) => item.location === location)
                    //   console.log({filteredData});
                    setJobToDisplay(data[0])
                    setIsDataPulled(true)
                }).catch(function() {
                    console.log("error");
                });
        }
    }, [id, isDataPulled])




    if (isDataPulled) {
        const { name, aboutUs, organisationName, address, telephoneNumber, eMail, websiteAddress, healthBoardArea } = jobToDisplay

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
                                    <h1>{name}</h1>
                                    <div className={styles.meta_block}>
                                        <div className={styles.text_section}>
                                                {organisationName &&
                                            <div className={styles.organisation}>
                                                <span>Organisation</span>
                                                    <p>{organisationName}</p> 
                                            </div>
                                                }
                                            {
                                                address &&
                                            <div className={styles.location}>
                                                <span>Address</span>
                                                <p>{address}</p>
                                            </div>
                                            }
                                            {
                                                healthBoardArea &&
                                                <div className={styles.location}>
                                                <span>Health Board</span>
                                                <p>{healthBoardArea}</p>
                                            </div>
                                            }
                                                                                        {
                                                telephoneNumber &&
                                                <div className={styles.telephoneNumber}>
                                                <span>Telephone</span>
                                                <p>{telephoneNumber}</p>
                                            </div>
                                            }
                                                                                        
                                                                                        {
                                                eMail &&
                                                <div className={styles.email}>
                                                <span>e-mail</span>
                                                <p>{eMail}</p>
                                            </div>
                                            }
                                                                                        
                                                                                        {
                                                websiteAddress &&
                                                <div className={styles.regions}>
                                                <span>Website</span>
                                                <p>{websiteAddress}</p>
                                            </div>
                                            }

                                        </div>

                                    </div>
                                </div>
                                <div className={styles.description_block}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: aboutUs
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

export default Organisation
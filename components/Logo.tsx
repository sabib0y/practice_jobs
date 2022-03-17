import logo from '../../public/images/logo.svg'
import Container from '@mui/material/Container';
import styles from '../../styles/Home.module.css';
import Link from 'next/link'

export default function Logo(){
    return(
        <Container>
        <div className={styles.header}>
          <Link href="/">
            <a><img src={logo.src} alt="logo" /></a>
          </Link>
        </div>
      </Container>
    )
}
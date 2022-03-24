import logo from '../public/images/logo.svg'
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.css';
import Image from 'next/image'
import Link from 'next/link'

export default function Logo(){
    return(
        <Container>
        <div className={styles.header}>
          <Link href="/">
            <a>
              <Image
        src={logo.src}
        alt="Logo"
        width={90}
        height={59}
      />
              </a>
          </Link>
        </div>
      </Container>
    )
}
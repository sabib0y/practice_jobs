import Logo from '../components/Logo';
import styles from '../styles/Home.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const VacancyCard = ({item}:any) => {

    return (
        <div className={styles.block}>
        <Card sx={{ minWidth: 275 }} className={styles.wide_card} onClick={() => { goToPage(item,'jobdetail') }}>
          <CardContent>
            <h4>{item.title} </h4>
            <div className={styles.inner_block}>
              {item.organisationName?.length ? 
                <p className={styles.org}>{item.organisationName} </p> : 
                <p>NHS</p>
              }      
              {
                item.closingDate &&
              <p className={styles.closing_date}>{new Date(item.closingDate).toLocaleDateString('en-GB')} </p>
              }              
              <p className={styles.location}>{item.location} </p>
            </div>
          </CardContent>

        </Card>
      </div>
    )
}

export default VacancyCard

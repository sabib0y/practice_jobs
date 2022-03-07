import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import styles from '../../styles/Home.module.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { categories, regions } from '../../utils/regions.js'

interface Props {
    searchParamss: any,
    searchParams: any,
    onInputChange: (e: any) => void
}


const SearchBar: React.FC<Props> = ({searchParamss,  searchParams, onInputChange }) => {

    const handleClick = () => {
        console.log('ping');
        searchParamss(searchParams)
    }

    return (
        <div className={styles.search_bar}>
            <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                placeholder='Search for a Vacancy'
                variant="filled"
                size="small"
                onChange={onInputChange}
                className={styles.text_field}
                value={searchParams.title}
                name='title'
            />

            <FormControl sx={{ m: 1, minWidth: 120 }} className={styles.region_field}>
                <Select
                    onChange={onInputChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    name='nhsBoard'
                    value={searchParams.nhsBoard}
                >
                    <MenuItem value="">
                        <em>Region</em>
                    </MenuItem>
                    {regions.map(({ label, value }, i) => (
                        <MenuItem value={value} key={i}>{label}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} className={styles.category_field}>
                <Select
                    onChange={onInputChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    name='jobFamily'
                    value={searchParams.jobFamily}

                >
                    <MenuItem value="">
                        <em>Category</em>
                    </MenuItem>
                    {categories.map(({ label, value }, i) => (
                        <MenuItem value={value} key={i}>{label}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                onClick={handleClick}
                className={styles.search_btn}
            >
                Search <span className={styles.btn_icon} />
            </Button>

        </div>
    )
}

export default SearchBar
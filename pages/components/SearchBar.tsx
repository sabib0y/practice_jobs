import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import styles from '../../styles/Home.module.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { categories, regions } from '../../utils/regions.js'
import { DriveEtaDimensions } from '@styled-icons/material/DriveEta';

interface Props {
    selectedRegion: any, 
    selectedCategory: any, 
    setSelectedRegion: any, 
    setSelectedCategory: any
    setSearchInput?: any
}


const SearchBar: React.FC<Props> = ({ selectedRegion, selectedCategory, setSelectedRegion, setSelectedCategory, setSearchInput }) => {

    const handleChangeRegion = (event: SelectChangeEvent) => {
        setSelectedRegion(event.target.value);
    };

    const handleChangeCategory = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
    };

    const handleClick = () => {
        console.log('ping');
    }

    const handleInputChange = (e: any) => {
        setSearchInput(e.target.value);
    }

    return (
        <div className={styles.search_bar}>
            <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                placeholder='Search for a Vacancy'
                variant="filled"
                size="small"
                onChange={handleInputChange}
                className={styles.text_field}
            />

            <FormControl sx={{ m: 1, minWidth: 120 }}  className={styles.region_field}>
                <Select
                    value={selectedRegion}
                    onChange={handleChangeRegion}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
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
                    value={selectedCategory}
                    onChange={handleChangeCategory}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
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
                Search <span className={styles.btn_icon}/>
            </Button>

        </div>
    )
}

export default SearchBar
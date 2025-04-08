import React, { useState, useEffect, useContext, useMemo } from 'react';
import List from "./List"
import Pagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import { Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import useInput from '../hooks/useInput';


const Advertisements = () => {

  const [locale, setLocale] = useState('ruRU');
  const [advertisements, setAdvertisements] = useState([])
  const [filtered, setFiltered] = useState([])
  const [allOfAdvertisement, setallOfAdvertisement] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const theme = useTheme();

  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme],
  );

  const searchInput = useInput()

  


  useEffect( () => {
    fetch('http://localhost:3000/advertisements').then(res => {
      return res.json()
    }).then(result => {
      setallOfAdvertisement(result.length)
    })
  },[])

  // fetch with calculated limit
  useEffect(() => {
    let start = 0
    let limit = 10

    page === 0 ? start = 0 : start = (page*rowsPerPage)
    rowsPerPage*(page + 1) > allOfAdvertisement ? limit = allOfAdvertisement : limit = rowsPerPage*(page + 1)
   
    fetch(`http://localhost:3000/advertisements?_start=${start}&_limit=${limit}`).then(res => {
      return res.json()
    }).then(result => {
      setAdvertisements(result)
    })

  }, [page, rowsPerPage, allOfAdvertisement])


  //search
  useEffect(() => {
    
    if( advertisements.length > 0 ) {
      console.log(advertisements)
      let test = advertisements.filter(el => el.name.toLowerCase().includes(searchInput.value))
      console.log(test)
      setFiltered(test)
    }
  }, [searchInput.value, advertisements])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <ThemeProvider
     theme={themeWithLocale}
    >
      <div>
        <div className='bg-slate-200 rounded-lg flex flex-row justify-between mb-5'>
          <Input
            {...searchInput}
            className='ml-4 my-2 w-1/3'
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
          <TablePagination
            className='w-1/2'
            component="div"
            count={allOfAdvertisement}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions = {[5, 10, 15, 25, 50]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
          <List
            listOfAdvertisements = {filtered.length === advertisements.length || searchInput.value.length == 0 ? advertisements : filtered}
            // listOfAdvertisements = {advertisements}
          />
      </div>
    </ThemeProvider>
  )
}
  
export default Advertisements;
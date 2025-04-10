import React, { useState, useEffect, useContext, useMemo } from 'react';
import List from "./List"
import TablePagination from '@mui/material/TablePagination';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import { Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputAdornment from '@mui/material/InputAdornment';
import useInput from '../hooks/useInput';
import CreateAdvertisement from './modalCreateAdvertisement'
import Tooltip from '@mui/material/Tooltip';
import SortIcon from '@mui/icons-material/Sort';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import sort_by from '../utils/sort'


const Advertisements = () => {

  const [locale, setLocale] = useState('ruRU');
  const [advertisements, setAdvertisements] = useState([])
  const [filtered, setFiltered] = useState([])
  const [allOfAdvertisement, setallOfAdvertisement] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  // !!!!!!!!!
  const [typeOfList, setTypeOfList] = useState(0)

  

  const theme = useTheme();

  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme],
  );

  const searchInput = useInput()
  
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const options = [
    '-',
    'Цена',
    'Нравится',
    'Просмотры'
  ]

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const openSort = Boolean(anchorEl);
  const openSortMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  
  const handleCloseSortMenu = () => {
    setAnchorEl(null);
  };


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
      setBuffAdv(result)
    })

  }, [page, rowsPerPage, allOfAdvertisement])


  //search
  useEffect(() => {
    
    if( advertisements.length > 0 ) {
      let test = advertisements.filter(el => el.name.toLowerCase().includes(searchInput.value))
      setFiltered(test)
    }
  }, [searchInput.value, advertisements])

  // sotring
  const [unsorted, setSorted] = useState(false)
  const [sortedAdv, setSortedAdv] = useState([])

  useEffect(() => {
    
    if(selectedIndex === 1) {

      let test = advertisements.toSorted(sort_by('price', true))
      setSortedAdv(test)

    } else if(selectedIndex === 2) {

      let test = advertisements.toSorted(sort_by('likes', true))
      setSortedAdv(test)

    } else if(selectedIndex === 3) {

      let test = advertisements.toSorted(sort_by('views', true))
      setSortedAdv(test)

    } else if(selectedIndex === 0) {
      
      setSortedAdv([])

    }
  }, [options[selectedIndex]])

  
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
          <Box className="w-1/3" sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Input
              {...searchInput}
              className='ml-4 my-2 w-full'
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
            <Tooltip title="Сортировать">
              <IconButton onClick={openSortMenu}>
                <SortIcon color='primary' className="" fontSize='large' />
              </IconButton>
            </Tooltip>
            { options[selectedIndex] !== '-' ? 
              <p className="mb-3 text-slate-600">
                {options[selectedIndex]}
              </p>
              : 
              <p></p>
            }
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openSort}
            onClose={handleCloseSortMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title="Новое объявление">
            <IconButton onClick={openModal}>
              <AddCircleOutlineIcon color='primary' className="" fontSize='large' />
            </IconButton>
          </Tooltip>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <CreateAdvertisement />
          </Modal>
          <TablePagination
            className='w-1/3'
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
          // listOfAdvertisements = {filtered.length === advertisements.length || searchInput.value.length === 0 ? advertisements : filtered}
          // sortedAdvertisements = { sortedAdv }
          listOfAdvertisements = {advertisements}
          listOffiltered = { filtered }
          listOfSorted = { sortedAdv }
          typeOfList = {typeOfList}
        />
      </div>
    </ThemeProvider>
  )
}
  
export default Advertisements;
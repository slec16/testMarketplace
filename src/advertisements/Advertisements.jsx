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

import Pagination from './Pagination';


/*
  Переделать сортировку(получать от бека)
  после закрытия модалки обновлять весь список
*/


const Advertisements = () => {

    const [locale, setLocale] = useState('ruRU');
    const [advertisements, setAdvertisements] = useState([])
    const [filtered, setFiltered] = useState([])
    const [allOfAdvertisement, setallOfAdvertisement] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    // !!!!!!!!!
    const [displayList, setDisplayList] = useState([])

    const [sortedAdv, setSortedAdv] = useState([])


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


    useEffect(() => {
        fetch('http://localhost:3000/advertisements').then(res => {
            return res.json()
        }).then(result => {
            setallOfAdvertisement(result.length)
        })
    }, [])

    // fetch with calculated limit
    useEffect(() => {
        let start = 0
        let limit = 10

        page === 0 ? start = 0 : start = (page * rowsPerPage)
        rowsPerPage * (page + 1) > allOfAdvertisement ? limit = allOfAdvertisement : limit = rowsPerPage * (page + 1)

        fetch(`http://localhost:3000/advertisements?_start=${start}&_limit=${limit}`).then(res => {
            return res.json()
        }).then(result => {
            setAdvertisements(result)
        })

    }, [page, rowsPerPage, allOfAdvertisement])


    //search
    useEffect(() => {


        if (advertisements.length > 0) {

            let test = advertisements.filter(el => el.name.toLowerCase().includes(searchInput.value))
            setFiltered(test)

        }


    }, [searchInput.value.length, advertisements])

    // sorting
    useEffect(() => {



        if (selectedIndex === 1) {

            let test = advertisements.toSorted(sort_by('price', true))
            setSortedAdv(test)

        } else if (selectedIndex === 2) {

            let test = advertisements.toSorted(sort_by('likes', true))
            setSortedAdv(test)

        } else if (selectedIndex === 3) {

            let test = advertisements.toSorted(sort_by('views', true))
            setSortedAdv(test)

        } else if (selectedIndex === 0) {

            setSortedAdv(advertisements)

        }
    }, [selectedIndex, advertisements])


    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        // setPage(newPage);
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
                <div className='bg-slate-200 rounded-lg mb-5 grid grid-cols-3 justify-items-stretch gap-0'>
                    {/* <Box className="" sx={{ display: 'flex', alignItems: 'flex-end' }}> */}
                    <div className='flex items-center ml-3 justify-between'>
                        <Input
                            {...searchInput}
                            className="w-full"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        />
                        <Tooltip title="Сортировать">
                            <IconButton onClick={openSortMenu}>
                                <SortIcon color='primary' fontSize='large' />
                            </IconButton>
                        </Tooltip>
                    </div>
                    {/* </Box> */}
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
                    <div className="grid grid-cols-3 content-center">
                        {options[selectedIndex] !== '-' ?
                            <p className="justify-self-start flex items-center text-slate-600">
                                {options[selectedIndex]}
                            </p> :
                            <div></div>
                        }
                        <div className="justify-self-center ">
                            <Tooltip title="Новое объявление">
                                <IconButton onClick={openModal}>
                                    <AddCircleOutlineIcon color='primary' fontSize='large'/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div></div>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <CreateAdvertisement />
                    </Modal>
                    {/* <div className='p-0'>
                        <TablePagination
                            component="div"
                            count={allOfAdvertisement}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5, 10, 15, 25, 50]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div> */}
                    <Pagination
                        count={allOfAdvertisement}
                        onPageChange={handleChangePage}

                    ></Pagination>
                </div>
                <List
                    listOfAdvertisements={advertisements}
                    listOfFiltered={filtered}
                    listOfSorted={sortedAdv}
                />
            </div>
        </ThemeProvider>
    )
}

export default Advertisements;
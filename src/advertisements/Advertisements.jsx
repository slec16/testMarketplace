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
    const [adv, setAdv] = useState([])
    const [filtered, setFiltered] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [paginationData, setPaginationData] = useState({})

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
        '',
        'price',
        'likes',
        'views'
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

    const fetchFnc = () => {
        fetch(`http://localhost:3000/advertisements?_page=${page}&_per_page=${rowsPerPage}&_sort=-${options[selectedIndex]}`).then(res => {
            return res.json()
        }).then(result => {
            setAllItems(result.items)
            setAdv(result.data)
            const pagination = {
                first: result.first,
                items: result.items,
                last: result.last,
                next: result.next,
                pages: result.pages,
                prev: result.prev
            }
            setPaginationData(pagination)
        })
    }

    useEffect(() => {
        fetchFnc()
    }, [page, rowsPerPage, selectedIndex])


    //search
    useEffect(() => {
        if (adv.length > 0) {
            let searched = adv.filter(el => el.name.toLowerCase().includes(searchInput.value))
            setFiltered(searched)
        }
    }, [searchInput.value.length, adv])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (rowsPerPage) => {
        setRowsPerPage(rowsPerPage)
        setPage(1)
    };


    return (
        <ThemeProvider
            theme={themeWithLocale}
        >
            <div>
                <div className='bg-slate-200 rounded-lg mb-5 grid grid-cols-3 justify-items-stretch gap-0'>
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
                                {option.length === 0 ? "-" : option}
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

                    <Pagination
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        paginationData={paginationData}
                    />
        
                </div>
                {adv.length !== 0 && 
                    <List
                        arrayOfAdvertisements={adv}
                        arrayOfFiltered={filtered}
                        // listOfSorted={sortedAdv}
                    />
                }
            </div>
        </ThemeProvider>
    )
}

export default Advertisements;
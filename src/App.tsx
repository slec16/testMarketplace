import './App.css'
import '../src/components/Header'
import Header from '../src/components/Header'
import TabsRouter from '../src/components/TabsRouter'
import { Routes, Route } from "react-router"
import Orders from './orders/Orders'
import Advertisements from './advertisements/Advertisements'
import AdvertisementPage from "./advertisements/AdvertisementPage"

function App() {

    return (
 
        <div className='flex flex-col h-screen sm:overflow-hidden px-2 sm:px-15'>
            <Header></Header>
            <TabsRouter></TabsRouter>
            <div className='flex-1 flex flex-col overflow-hidden '>
                <Routes>
                    <Route path='/' element={<div className='text-2xl text-sky-600'>Мой Профиль</div>}/>
                    <Route path='/advertisements' element={<Advertisements />} />
                    <Route path='/orders' element={<Orders />}/>
                    <Route path='/advertisements/:id' element={<AdvertisementPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default App

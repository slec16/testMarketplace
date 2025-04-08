import './App.css'
import '../src/components/Header'
import Header from '../src/components/Header'

import TabsRouter from '../src/components/TabsRouter'
import { Routes, Route } from "react-router";
import Orders from '../src/orders/Orders'
import Advertisements from './advertisements/Advertisements'
import Wrapper from './components/Wrapper';
import AdvertisementPage from "./advertisements/AdvertisementPage"

function App() {




    return (
        <>
            <Wrapper>

                <Header></Header>
                <TabsRouter></TabsRouter>

                <Routes>
                    <Route path='/advertisements' element={<Advertisements />} />
                    <Route path='/orders' element={<Orders />}/>
                    <Route path='/advertisements/:id' element={<AdvertisementPage />} />
                </Routes>

            </Wrapper>

        </>
    )
}

export default App

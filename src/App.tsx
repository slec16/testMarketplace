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
        // <div className=''>
        //     <Wrapper>

        //         <Header></Header>
                // <TabsRouter></TabsRouter>

                // <Routes>
                //     <Route path='/' element={<div></div>}/>
                //     <Route path='/advertisements' element={<Advertisements />} />
                //     <Route path='/orders' element={<Orders />}/>
                //     <Route path='/advertisements/:id' element={<AdvertisementPage />} />
                // </Routes>
                
        //         {/* footer */}
        //         <div className='w-full h-7'>footer</div>
        //     </Wrapper>

        // </div>
        // <Layout>
        //     <TabsRouter></TabsRouter>

        //     <Routes>
        //         <Route path='/' element={<div></div>}/>
        //         <Route path='/advertisements' element={<Advertisements />} />
        //         <Route path='/orders' element={<Orders />}/>
        //         <Route path='/advertisements/:id' element={<AdvertisementPage />} />
        //     </Routes>
        // </Layout>
        <div className='flex flex-col h-screen overflow-hidden xl:px-15'>
            <Header></Header>
            <TabsRouter></TabsRouter>
            <div className='flex-1 flex flex-col overflow-hidden '>
                <Routes>
                    <Route path='/' element={<div></div>}/>
                    <Route path='/advertisements' element={<Advertisements />} />
                    <Route path='/orders' element={<Orders />}/>
                    <Route path='/advertisements/:id' element={<AdvertisementPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default App

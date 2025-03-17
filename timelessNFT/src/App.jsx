import Header from "./components/Header"
import Hero from "./components/Hero"
import ArtWorks from "./components/Artworks"
import Transactions from "./components/Transactions"
import Footer from "./components/Footer"
import CreateNFT from "./components/CreateNFT"
import ShowNFT from "./components/ShowNFT"
import UpdateNFT from "./components/UpdateNFT"
import Loading from "./components/Loading"
import Alert from "./components/Alert"
import { useEffect } from "react"
import { getAllNFTs, isWallectConnected } from "./Blockchain.Services"
const App = () => {
  useEffect(async()=>{
    await isWallectConnected()
    // await getAllNFTs()
  },[])
  return (
    <div className="min-h-screen">
      <div className = "gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <ArtWorks />
      <Transactions />
      <Footer/>
      <CreateNFT/>
      <ShowNFT/>
      <UpdateNFT/>
      <Loading/>
      <Alert/>
    </div>
  )
}

export default App

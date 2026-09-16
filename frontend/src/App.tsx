import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"
import { useGamesStore } from "./store/useGamesStore"
import Landing from "./pages/Landing"
import Home from "./pages/Home"
import Loading from "./components/Loading"
import { Route, Routes } from "react-router"
import Chart from "./pages/Chart"
import Profile from "./pages/Profile"

function App() {
  const { loggedIn, checking, checkAuth } = useAuthStore()
  const { loading, error, fetchGames } = useGamesStore()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      fetchGames()
    }
  }, [loggedIn])

  if (checking){
    return <Loading message="Checking Login Status..."/>
  }
  if (!loggedIn){
    return <Landing />
  }

  if(loading){
    return <Loading message="Checking Your game library"/>
  }

  if(error){
    return <p>{error}</p>
  }

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/chart" element={<Chart/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  )
}

export default App
import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"
import { useGamesStore } from "./store/useGamesStore"
import Landing from "./pages/Landing"
import Home from "./pages/Home"

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
    return <p>Checking login ....</p>
  }
  if (!loggedIn){
    return <Landing />
  }

  if(loading){
    return <p>Loading you library</p>
  }

  if(error){
    return <p>{error}</p>
  }

  return <Home />
}

export default App
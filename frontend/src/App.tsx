import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"
import { useGamesStore } from "./store/useGamesStore"
import Landing from "./pages/Landing"
import Home from "./pages/Home"
import Loading from "./components/Loading"

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

  return <Home />
}

export default App
import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"
import { useGamesStore } from "./store/useGamesStore"
import { login } from "./api/auth"
import { priceTotals } from "./utils/priceTotals"

function App() {
  const { loggedIn, checking, checkAuth } = useAuthStore()
  const { games, gameCount, loading, error, fetchGames } = useGamesStore()
  const {totalMin, totalMax} = priceTotals(games)

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
  return <button onClick={login}>Login with Steam</button>
}

if(loading){
  return <p>Loading you library</p>
}

if(error){
  return <p>{error}</p>
}

  return (
    <div>
      <h1>Your Library ({gameCount} games)</h1>
      <h2>Estimated Value: ${totalMin.toFixed(2)} - ${totalMax.toFixed(2)}</h2>
      <ul>
        {games.map((game) => (
          <li key={game.appId}>
            {game.name} - min: {game.min ?? "N/A"}, max: {game.max ?? "N/A"}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [result, setResult] = useState([])
  const [input,setInput]=useState<string>("")
  const [showResult,setShowResult]=useState<boolean>(false)
  const [cache,setCache]=useState<object>({})
  const fetchData=async()=>{
    console.log("api call",input)

    if(cache[input]){
      setResult(cache[input])
      console.log("cache returned",input)
      return
    }
    const data=await fetch("https://dummyjson.com/recipes/search?q=" + input)
    const res= await data.json()
    console.log(res)
    setResult(res.recipes)
    setCache((prev) => ({...prev,[input]:res.recipes}))
  }

  useEffect(()=>{
    const timer=setTimeout(fetchData,300)

    return ()=>(
      clearTimeout(timer)
    )

  },[input])

  return(
    <div className='App'>
      <h1>Autocomplete search bar</h1>
      <div className='input-box'>
        <input type="text" className='search-input' value={input}  onChange={(e)=> setInput(e.target.value)} onFocus={()=> setShowResult(true)}
        onBlur={() => setShowResult(false)}/>
      </div>

     {showResult &&( <div className='result-container'>
        {result.map((r)=> <span key={r.id} className='result'> {r.name}</span>)}
      </div>)
}
    </div>
  )
}

export default App

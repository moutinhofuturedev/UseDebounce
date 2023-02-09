import { useEffect, useState } from 'react'
import useDebounce from './hooks/useDebounce';

type ApiProps = {
  name: string
}

function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    async function starting() {
      const fetchApi = await fetch('https://api.github.com/users/moutinhofuturedev/repos')
      const response = await fetchApi.json().then(data => {
        const repositories = data.map((item: ApiProps) => item.name)
        const d = repositories.filter((element: string) => element.includes(debouncedQuery))

        return d
      })

      setItems(response)
    }
    starting()
  }, [debouncedQuery])

  return(
    <div>
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {
        items.length > 0 ?
        items.map((item, index) => <li key={index}>{item}</li>)
        :
        <div>No results</div>
      }
    </div>
  )
}

export default App

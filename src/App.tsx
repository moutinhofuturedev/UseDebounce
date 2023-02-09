import { useEffect, useState } from 'react'
import useDebounce from './hooks/useDebounce';
import { Box, Heading, Input, Text } from '@chakra-ui/react';

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
    <Box mb="4rem">
      <Box ml="1rem">
        <Heading as="h3" my="2rem">Repositórios</Heading>
        <Input w="16rem" placeholder="Procure o repositório" value={query} onChange={(e) => setQuery(e.target.value)} />
      </Box>
      {
        items.length > 0 ?
          items.map((item, index) => <Box px="2rem" py="1rem" key={index}>{item}</Box>)
          :
          <Text ml="1rem" mt="1rem">No results</Text>
      }
    </Box>
  )
}

export default App

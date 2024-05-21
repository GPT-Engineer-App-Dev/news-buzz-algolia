import { useEffect, useState } from "react";
import { Container, Text, VStack, Input, Button, Box, Link, Spinner } from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } catch (error) {
      console.error("Error fetching data from Algolia API", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="3xl" fontWeight="bold">Hacker News Aggregator</Text>
        <Input
          placeholder="Search Hacker News"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="lg"
        />
        <Button onClick={fetchResults} colorScheme="teal" size="lg" isFullWidth>
          Search
        </Button>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <VStack spacing={4} width="100%">
            {results.map((result) => (
              <Box key={result.objectID} p={4} borderWidth="1px" borderRadius="md" width="100%">
                <Link href={result.url} isExternal fontSize="xl" fontWeight="bold">
                  {result.title}
                </Link>
                <Text mt={2}>{result.points} points | {result.author}</Text>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
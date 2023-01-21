import React from 'react'
import Head from 'next/head'
import SearchHeader from '../components/SearchHeader'
import Response from '../Response'
import SearchResults from '../components/SearchResults'
import { useRouter } from 'next/router'
import ImageResult from '../components/imageResult'
export default function search({results}) {
const router = useRouter()
  console.log(results)
  return (
    <div>
        <Head>
            <title> {router.query.term}  - Search Page</title>
        </Head>

        {/* Search Header  */}
        <SearchHeader/>
        {/* Search web amd images  Results */}
        {router.query.searchType === "image" ? (
          <ImageResult results={results} />
        ) : (<SearchResults results={results} />)}
          
        
        
    </div>
  )
}
export async function getServerSideProps(context){
  const startIndex = context.query.start || "1"
  const mockData = false
  const data = mockData ?  Response : await fetch(
`https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}${ context.query.searchType && "&searchType=image" }&start=${startIndex} `
  ).then((response) => response.json())
  return {
    props : { 
      results : data
    }
  }
}

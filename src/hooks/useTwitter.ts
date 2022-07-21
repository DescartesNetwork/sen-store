import { useEffect, useState } from 'react'

const useTwitter = () => {
  const [data, setData] = useState()
  const fetchData = async () => {
    let url =
      'https://api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=popular'
    const data = await fetch(url).then((val) => val.json())
    console.log('data: ', data)
    setData(data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return { data }
}

export default useTwitter

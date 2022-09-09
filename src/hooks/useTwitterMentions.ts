import { useMemo } from 'react'
import useSWR from 'swr'
import { useRegisterSelector } from '@sentre/senhub'

export type TwitterMentions = {
  id: string
  name: string
  avatar: string
  username: string
  text: string
  appId: string
}

const fetcher = async (url: string) =>
  await fetch(url, { credentials: 'include' }).then((res) => res.json())

export const useTwitterMentions = (appId: string) => {
  const { name } = useRegisterSelector((register) => {
    if (appId === 'sentre') return { name: 'Sentre' }
    return register[appId] || { name: 'Sentre' }
  })
  const url = useMemo(
    () => `https://api.sentre.io/twitter/mentions/${name}`,
    [name],
  )
  const { data: raw, error } = useSWR(url, fetcher)
  if (!raw && !error) return { data: [], loading: true }
  if (error) return { data: [], loading: false }

  const {
    data,
    includes: { users },
  } = raw
  const normalizedData: TwitterMentions[] = data.map(
    ({
      author_id,
      id,
      text,
    }: {
      author_id: string
      id: string
      text: string
    }) => {
      const { name, username, profile_image_url } = users.find(
        ({ id }: { id: string }) => id === author_id,
      )
      return { appId, id, text, name, username, avatar: profile_image_url }
    },
  )

  return { data: normalizedData, loading: false }
}

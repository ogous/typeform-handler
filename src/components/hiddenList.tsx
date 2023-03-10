import { button } from '@/theme'
import type { Submission } from '@prisma/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import Loader from './loader'
import SumbissionItem from './submissionItem'

export default function HiddenList() {
  async function fetchVisibles({ pageParam = 0 }) {
    try {
      const response = await fetch(
        `/api/submissions/hidden?offset=${pageParam}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      const data = await response.json()
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }

  const {
    data,
    error,
    fetchNextPage,
    // hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery<Submission[]>(['hidden-submissions'], fetchVisibles, {
    getNextPageParam: (_, pages) => {
      const dataLength = pages?.flatMap((page) => page).length ?? 0
      return dataLength
    }
  })

  const submissions = data?.pages.flatMap((page) => page) ?? []

  if (status === 'loading')
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    )

  if (status === 'success' && submissions?.length === 0) {
    return (
      <div>
        <h3 className="font-bold">Hidden Submissions</h3>
        <div>No data</div>
      </div>
    )
  }

  if (status === 'error') {
    return <div>{`Error occured: ${error}.`}</div>
  }

  return (
    <div className="w-[300px]">
      <h3 className="font-bold">Hidden Submissions</h3>
      {submissions?.map((i) => (
        <SumbissionItem key={i.id} item={i} />
      ))}
      {submissions.length < 10 ? null : isFetchingNextPage ? (
        <Loader />
      ) : (
        <button
          disabled={isFetchingNextPage}
          className={button}
          onClick={() => fetchNextPage()}
        >
          Fetch Next Page
        </button>
      )}
    </div>
  )
}

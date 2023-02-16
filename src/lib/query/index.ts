import { QueryClient, QueryCache } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // // only show error toasts if we already have data in the cache
      // // which indicates a failed background update
      if (query.state.data !== undefined) {
        toast.error(
          `Something went wrong: ${error instanceof Error && error.message}`
        )
      }
    }
  })
})

export default queryClient

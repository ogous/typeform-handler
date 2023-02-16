import { button } from '@/theme'
import type { Submission } from '@prisma/client'
import { toast } from 'react-hot-toast'

export default function SumbissionItem({ item }: { item: Submission }) {
  const promisifiedHideSubmission = () =>
    new Promise<Submission>(async (res, rej) => {
      try {
        const response = await fetch(`/api/submissions/${item.id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ id: item.id })
        })
        const data = await response.json()
        if (data) {
          res(data)
        } else {
          rej('Unknown error')
        }
      } catch (error) {
        rej(error)
      }
    })

  const handler = () =>
    toast.promise(promisifiedHideSubmission(), {
      loading: 'Generating mock form response',
      error: (e) => `Error: ${e.message}`,
      success: 'Success'
    })

  return (
    <div className="mb-2 border border-white border-opacity-10 p-4">
      <p className="font-inter font-bold">{item.projectName}</p>
      <p className="text-sm text-white text-opacity-70">
        by <span>{item.fullName}</span>
      </p>
      <p className="text-sm text-white text-opacity-70">
        {item.email.toLowerCase()}
      </p>
      {item.hidden ? null : (
        <button className={button} onClick={handler}>
          Hide
        </button>
      )}
    </div>
  )
}

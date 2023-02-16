import { useState } from 'react'
import Head from 'next/head'
import { button } from '@/theme'
import Modal from '@/components/modal'
import type { Submission } from '@prisma/client'
import { toast } from 'react-hot-toast'
import VisibleList from '@/components/visibleList'
import HiddenList from '@/components/hiddenList'
import clsx from 'clsx'
import queryClient from '@/lib/query'
export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [insertedData, setInsertedData] = useState<Submission>()

  const promisifiedDummyData = () =>
    new Promise<Submission>(async (res, rej) => {
      try {
        const response = await fetch('/api/submissions/webhook', {
          method: 'POST'
        })
        const data = await response.json()
        if (data) {
          res(data)
          setInsertedData(data)
          await queryClient.invalidateQueries(['visible-submissions'])
          setIsModalVisible(true)
        } else {
          rej('Unknown error')
        }
      } catch (error) {
        rej(error)
      }
    })

  const handler = () =>
    toast.promise(promisifiedDummyData(), {
      loading: 'Generating mock form response',
      error: (e) => `Error: ${e.message}`,
      success: 'Success'
    })

  return (
    <>
      <Head>
        <title>Dashboard | Typeform Handler</title>
        <meta name="description" content="Manage your submissions" />
      </Head>
      <button className={clsx('my-4', button)} onClick={handler}>
        Insert Form Response
      </button>
      <div className="flex justify-between gap-4">
        <VisibleList />
        <HiddenList />
      </div>

      <Modal
        isOpen={isModalVisible}
        setIsOpen={setIsModalVisible}
        dismiss={() => setInsertedData(undefined)}
      >
        <div>
          <p className="mb-4 font-inter text-xl font-bold">
            Inserted Dummy Response
          </p>
          <p className="text-md font-inter font-bold">
            {insertedData?.projectName}
          </p>
          <p className="text-gray-500">{insertedData?.fullName}</p>
          <p className="text-gray-500">{insertedData?.email}</p>
        </div>
      </Modal>
    </>
  )
}

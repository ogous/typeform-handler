import { useState } from 'react'
import Head from 'next/head'
import { button } from '@/theme'
import Modal from '@/components/modal'
import type { Submission } from '@prisma/client'
import { toast } from 'react-hot-toast'
import VisibleList from '@/components/visibleList'
import HiddenList from '@/components/hiddenList'
import clsx from 'clsx'

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
      <div className="flex self-stretch">
        <VisibleList />
        <HiddenList />
      </div>
      <button className={clsx('absolute', button)} onClick={handler}>
        Insert Form Response
      </button>
      <Modal
        isOpen={isModalVisible}
        setIsOpen={setIsModalVisible}
        dismiss={() => setInsertedData(undefined)}
      >
        <div>{JSON.stringify(insertedData)}</div>
      </Modal>
    </>
  )
}

import type { NextApiRequest, NextApiResponse } from 'next'
// import type { Submission } from '@prisma/client'
import { prisma } from '@/prisma'

const hideSubmission = async (
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) => {
  const { id } = req.query
  try {
    if (typeof id !== 'string') throw new Error('Submission id is not valid')

    const response = await prisma.submission.update({
      where: { id },
      data: {
        hidden: true
      }
    })

    res.status(200).json(!!response)
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
      res.status(404)
    }
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'DELETE':
      return hideSubmission(req, res)
    default:
      res.setHeader('Allow', ['DELETE'])
      return res.status(405).send(`Method ${method} Not Allowed`)
  }
}

export default handler

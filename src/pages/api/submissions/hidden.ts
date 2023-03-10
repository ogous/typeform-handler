import type { NextApiRequest, NextApiResponse } from 'next'
import type { Submission } from '@prisma/client'
import { prisma } from '@/prisma'

const listHiddenSubmission = async (
  req: NextApiRequest,
  res: NextApiResponse<Submission[]>
) => {
  const { offset } = req.query

  try {
    if (typeof offset !== 'string') throw new Error('Invalid page number')

    const response = await prisma.submission.findMany({
      where: { hidden: true },
      skip: offset ? Number(offset) : 0,
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    res.status(200).json(response)
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
    case 'GET':
      return listHiddenSubmission(req, res)
    default:
      res.setHeader('Allow', ['GET'])
      return res.status(405).send(`Method ${method} Not Allowed`)
  }
}

export default handler

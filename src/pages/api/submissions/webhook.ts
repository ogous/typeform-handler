import type { NextApiRequest, NextApiResponse } from 'next'
import type { Submission } from '@prisma/client'
import { prisma } from '@/prisma'
import { faker } from '@faker-js/faker'

const postWebhookResponse = async (
  _: NextApiRequest,
  res: NextApiResponse<Submission>
) => {
  try {
    const data = {
      email: faker.internet.email(),
      fullName: faker.name.fullName(),
      projectName: faker.commerce.productName()
    }

    const response = await prisma.submission.create({ data })

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
    case 'POST':
      return postWebhookResponse(req, res)
    default:
      res.setHeader('Allow', ['POST'])
      return res.status(405).send(`Method ${method} Not Allowed`)
  }
}

export default handler

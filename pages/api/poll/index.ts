import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
// import { getSession } from 'next-auth/react'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const data = {
        ...req.body,
        options: {create: req.body.options},
        published: true
    };

    if (!data.uid.length) {
        data.uid = 'random_string'; // TODO: add unique uid
    }

    //const session = await getSession({ req });
    //if (session) {
        const result = await prisma.poll.create({
            data,
        });
        res.json(result);
   // } else {
    //    res.status(401).send({ message: 'Unauthorized' })
    //}
}
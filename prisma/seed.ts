import {PrismaClient} from '@prisma/client'
import pollData from "./polls";
const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)
    for (const p of pollData) {
        const poll = await prisma.poll.create({
            data: p,
        })
        console.log(`Created poll with id: ${poll.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
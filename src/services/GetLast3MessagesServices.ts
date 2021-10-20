import prismaClient from "../prisma"


class GetLast3MessagesServices {
    async execute() {
        const messages = await prismaClient.message.findMany({
            take: 3,
            orderBy: {
                created_at: "desc"
            },
            include: {
                user: true,
            }
        })

        // select top 3 * from messages order by created_at desc
        return messages;
    }
}

export { GetLast3MessagesServices }
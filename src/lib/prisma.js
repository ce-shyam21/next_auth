import { Prisma, PrismaClient } from "@prisma/client";
let prisma;
//if our app is in produton mode then create new instance of prisma cleint
// otherwise global instance of prisma client
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
}
else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma;
}

export default prisma;
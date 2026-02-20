import { PrismaPg } from "@prisma/adapter-pg";
import { Config } from "../config/config";
import { PrismaClient } from "@prisma/client";




const pgAdapter = new PrismaPg({
  connectionString: Config.prisma.DATABASE_URL
})


const prisma = new PrismaClient({adapter: pgAdapter})

export {prisma}



import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const hostel = await prisma.hostel.create({
    data: {
      name: "Main Hostel",
      address: "Hridyaganj katihar"
    }
  })

  const hashedPassword = await bcrypt.hash("Admin@bk@", 10)

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@hostel.com",
      password: hashedPassword,
      role: Role.ADMIN,
      hostelId: hostel.id
    }
  })

  console.log("✅ Admin created successfully")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

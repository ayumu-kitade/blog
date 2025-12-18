import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {    
    await prisma.user.deleteMany();
    await prisma.post.deleteMany();

    const hashedPassword = await bcrypt.hash("password123", 10);
    const dummyImages = [
        "https://picsum.photos/1280/720?random=1",
        "https://picsum.photos/1280/720?random=2",
        "https://picsum.photos/1280/720?random=3"
    ]
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john@example.com",
            password: hashedPassword,
            post: {create: [
                {
                    title: "Hello World",
                    content: "This is my first post",
                    topImage: dummyImages[0],
                    published: true
                },
                {
                    title: "Second Post",
                    content: "This is my second post",
                    topImage: dummyImages[1],
                    published: true
                }
            ]}
        }
    })

    console.log("Seeded user:", user);
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
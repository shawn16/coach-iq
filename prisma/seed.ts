import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a test coach
  const coach = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      first_name: "Test",
      last_name: "Coach",
      password_hash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu.Vm", // password: test123
      role: "coach",
    },
  });

  // Create some test athletes
  const athlete1 = await prisma.athlete.create({
    data: {
      first_name: "John",
      last_name: "Doe",
      birthday: new Date("2005-01-15"),
      grade: 11,
      gender: "MALE",
      active: true,
      coach_id: coach.id,
      time1600m: "4:38",
    },
  });

  const athlete2 = await prisma.athlete.create({
    data: {
      first_name: "Jane",
      last_name: "Smith",
      birthday: new Date("2006-03-20"),
      grade: 10,
      gender: "FEMALE",
      active: true,
      coach_id: coach.id,
      time1600m: "5:20",
    },
  });

  console.log("Seed data created:", { coach, athlete1, athlete2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

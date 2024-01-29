import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function add(date: Date, days: number): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

async function main() {
    await prisma.testResult.deleteMany({})
    await prisma.courseEnrolment.deleteMany({})
    await prisma.test.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.course.deleteMany({})

    const grace = await prisma.user.create({
        data: {
          email: 'grace@hey.com',
          firstName: 'Grace',
          lastName: 'Bell',
          password: '',
          social: {
            facebook: 'gracebell',
            twitter: 'therealgracebell',
          },
        },
      })

    const weekFromNow = add(new Date(), 7 )
    const twoWeekFromNow = add(new Date(), 14)
    const monthFromNow = add(new Date(), 28)
    
    const course = await prisma.course.create({
        data: {
            name: "CRUD with Prisma",
            tests: {
                create: [
                    {
                        date: weekFromNow,
                        name: 'First Test'
                    },
                    {
                        date: twoWeekFromNow,
                        name: 'Second Test'
                    },
                    {
                        date: monthFromNow,
                        name: 'Third Test'
                    }
                ]
            },
            members: {
                create: {
                    role: 'TEACHER',
                    user: {
                        connect: {email: grace.email}
                    }
                }
            }
        },
        include: {
            tests: true
        }
    })

    const shakuntala = await prisma.user.create({
        data: {
          email: 'devi@prisma.io',
          firstName: 'Shakuntala',
          lastName: 'Devi',
          password: '',
          courses: {
            create: {
              role: 'STUDENT',
              course: {
                connect: { id: course.id },
              },
            },
          },
        },
      })
      
      const david = await prisma.user.create({
        data: {
          email: 'david@prisma.io',
          firstName: 'David',
          lastName: 'Deutsch',
          password: '',
          courses: {
            create: {
              role: 'STUDENT',
              course: {
                connect: { id: course.id },
              },
            },
          },
        },
      })

      console.log(
        `Created test user\tid: ${grace.id} | email: ${grace.email} `,
      )

      console.log(
        `Created test user\tid: ${shakuntala.id} | email: ${shakuntala.email} `,
      )

      console.log(
        `Created test user\tid: ${david.id} | email: ${david.email} `,
      )

      console.log(
        `Created test course\tid: ${course.id} | name: ${course.name} `,
      )

    const resultsDavid = [650, 900, 950]
    const resultsShakuntala = [800, 950, 910]

    let counter = 0
    for (const test of course.tests){
        const testResultsShakuntala = await prisma.testResult.create({
            data: {
                gradedBy: {
                    connect: {
                        email: grace.email
                    }
                },
                student: {
                    connect: {
                        email: shakuntala.email
                    }
                },
                test: {
                    connect: {
                        id: course.tests[counter].id
                    }
                },
                result: resultsShakuntala[counter]
            }
        })

        console.log(
            `Created test results\tid: ${testResultsShakuntala.id} | graded By: ${testResultsShakuntala.graderId} | 
            Student: ${testResultsShakuntala.studentId} | test taken: ${testResultsShakuntala.testId} | Test Results: ${testResultsShakuntala.result}`
          )

          const testResultsDavid = await prisma.testResult.create({
            data: {
                gradedBy: {
                    connect: {
                        email: grace.email
                    }
                },
                student: {
                    connect: {
                        email: david.email
                    }
                },
                test: {
                    connect: {
                        id: course.tests[counter].id
                    }
                },
                result: resultsDavid[counter]
            }
        })

        console.log(
            `Created test results\tid: ${testResultsDavid.id} | graded By: ${testResultsDavid.graderId} | 
            Student: ${testResultsDavid.studentId} | test taken: ${testResultsDavid.testId} | Test Results: ${testResultsDavid.result}`
          )

        counter++
    }

    for (const test of course.tests) {
        const results = await prisma.testResult.aggregate({
          where: {
            testId: test.id,
          },
          _avg: { result: true },
          _max: { result: true },
          _min: { result: true },
          _count: true,
        })
        console.log(`test: ${test.name} (id: ${test.id})`, results)
      }
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect()
  })
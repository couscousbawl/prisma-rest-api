"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function add(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.testResult.deleteMany({});
        yield prisma.courseEnrolment.deleteMany({});
        yield prisma.test.deleteMany({});
        yield prisma.user.deleteMany({});
        yield prisma.course.deleteMany({});
        const grace = yield prisma.user.create({
            data: {
                email: 'grace@hey.com',
                firstName: 'Grace',
                lastName: 'Bell',
                social: {
                    facebook: 'gracebell',
                    twitter: 'therealgracebell',
                },
            },
        });
        const weekFromNow = add(new Date(), 7);
        const twoWeekFromNow = add(new Date(), 14);
        const monthFromNow = add(new Date(), 28);
        const course = yield prisma.course.create({
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
                            connect: { email: grace.email }
                        }
                    }
                }
            },
            include: {
                tests: true
            }
        });
        const shakuntala = yield prisma.user.create({
            data: {
                email: 'devi@prisma.io',
                firstName: 'Shakuntala',
                lastName: 'Devi',
                courses: {
                    create: {
                        role: 'STUDENT',
                        course: {
                            connect: { id: course.id },
                        },
                    },
                },
            },
        });
        const david = yield prisma.user.create({
            data: {
                email: 'david@prisma.io',
                firstName: 'David',
                lastName: 'Deutsch',
                courses: {
                    create: {
                        role: 'STUDENT',
                        course: {
                            connect: { id: course.id },
                        },
                    },
                },
            },
        });
        console.log(`Created test user\tid: ${grace.id} | email: ${grace.email} `);
        console.log(`Created test user\tid: ${shakuntala.id} | email: ${shakuntala.email} `);
        console.log(`Created test user\tid: ${david.id} | email: ${david.email} `);
        console.log(`Created test course\tid: ${course.id} | name: ${course.name} `);
        const resultsDavid = [650, 900, 950];
        const resultsShakuntala = [800, 950, 910];
        let counter = 0;
        for (const test of course.tests) {
            const testResultsShakuntala = yield prisma.testResult.create({
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
            });
            console.log(`Created test results\tid: ${testResultsShakuntala.id} | graded By: ${testResultsShakuntala.graderId} | 
            Student: ${testResultsShakuntala.studentId} | test taken: ${testResultsShakuntala.testId} | Test Results: ${testResultsShakuntala.result}`);
            const testResultsDavid = yield prisma.testResult.create({
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
            });
            console.log(`Created test results\tid: ${testResultsDavid.id} | graded By: ${testResultsDavid.graderId} | 
            Student: ${testResultsDavid.studentId} | test taken: ${testResultsDavid.testId} | Test Results: ${testResultsDavid.result}`);
            counter++;
        }
        for (const test of course.tests) {
            const results = yield prisma.testResult.aggregate({
                where: {
                    testId: test.id,
                },
                _avg: { result: true },
                _max: { result: true },
                _min: { result: true },
                _count: true,
            });
            console.log(`test: ${test.name} (id: ${test.id})`, results);
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    // Disconnect Prisma Client
    yield prisma.$disconnect();
}));

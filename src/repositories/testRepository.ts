import { prisma } from '../config/prisma';

import { InsertTestDTO } from '../dtos/TestRequestDTO';

export interface ITest {
  id: number;
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherDiscipline: {
    id: number;
    teacher: {
      id: number;
      name: string;
    };
    discipline: {
      id: number;
      name: string;
    };
  };
}

async function create(data: InsertTestDTO): Promise<void> {
  await prisma.test.create({
    data,
  });
}

async function getByDisciplines(): Promise<any> {
  const terms = await prisma.term.findMany({
    select: {
      id: true,
      number: true,
      disciplines: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      tests: {
        select: {
          id: true,
          name: true,
          pdfUrl: true,
          teacherDiscipline: {
            select: {
              discipline: {
                select: {
                  id: true,
                  name: true,
                  term: {
                    select: {
                      id: true,
                      number: true,
                    },
                  },
                },
              },
              teacher: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const termsWithCategories = terms.map((term) => {
    const termWithCategories = {
      ...term,
      disciplines: term.disciplines.map((discipline) => {
        const disciplineWithCategories = {
          ...discipline,
          categories: categories.map((category) => {
            const categoryWithTests = {
              ...category,
              tests: category.tests
                .filter((test) => {
                  return (
                    test.teacherDiscipline.discipline.id === discipline.id &&
                    test.teacherDiscipline.discipline.term.id === term.id
                  );
                })
                .map((test) => {
                  return {
                    id: test.id,
                    name: test.name,
                    pdfUrl: test.pdfUrl,
                    teacher: {
                      id: test.teacherDiscipline.teacher.id,
                      name: test.teacherDiscipline.teacher.name,
                    },
                  };
                }),
            };
            return categoryWithTests;
          }),
        };
        return disciplineWithCategories;
      }),
    };
    return termWithCategories;
  });

  return termsWithCategories;
}

async function getByTeachers(): Promise<any[]> {
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const tests = await prisma.teacherDiscipline.findMany({
    select: {
      teacher: true,
      discipline: {
        include: {
          term: true,
        },
      },
      tests: {
        select: {
          id: true,
          name: true,
          pdfUrl: true,
          category: true,
        },
      },
    },
    orderBy: {
      teacher: {
        name: 'asc',
      },
    },
  });

  const teachersWithTests = teachers.map((teacher) => {
    const teacherWithTests = {
      ...teacher,
      categories: categories.map((category) => {
        const categoryWithTests = {
          ...category,
          tests:
            tests
              .filter(
                (test) =>
                  test.teacher.id === teacher.id && test.tests.length > 0
              )
              .map((test) => {
                return test.tests
                  .filter((t) => t.category.id === category.id)
                  .map((tes) => {
                    return {
                      id: tes.id,
                      name: tes.name,
                      pdfUrl: tes.pdfUrl,
                      termId: test.discipline.term.id,
                      termNumber: test.discipline.term.number,
                      disciplineId: test.discipline.id,
                      disciplineName: test.discipline.name,
                    };
                  });
              })[0] || [],
        };
        return categoryWithTests;
      }),
    };
    return teacherWithTests;
  });
  return teachersWithTests;
}

export const testRepository = {
  create,
  getByDisciplines,
  getByTeachers,
};

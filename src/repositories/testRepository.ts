import { prisma } from '../config/prisma';

import { InsertTestDTO } from '../dtos/TestRequestDTO';

async function create(data: InsertTestDTO): Promise<void> {
  await prisma.test.create({
    data,
  });
}

async function findAll(): Promise<any[]> {
  const tests = await prisma.test.findMany({
    select: {
      id: true,
      name: true,
      pdfUrl: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      teacherDiscipline: {
        include: {
          teacher: true,
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
        },
      },
    },
  });

  return tests;
}

async function getByDisciplines() {
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

export const testRepository = {
  create,
  findAll,
  getByDisciplines,
};

import { faker } from '@faker-js/faker';

export function generateJobRecords() {
  return Array.from({ length: 7 }).map(() => ({
    id: faker.database.mongodbObjectId(),
    title: faker.person.jobTitle(),
    pax: faker.number.int({ min: 1, max: 5 }), // Updated method
    description: faker.lorem.paragraph(),
    icon: faker.image.urlPicsumPhotos({ width: 40, height: 40 }),
    authorEmail: faker.internet.email(),
    contact: [faker.phone.number()],
    published: faker.datatype.boolean(),
    likes: faker.number.int({ min: 0, max: 1000 }),
    views: faker.number.int({ min: 0, max: 5000 }),
    publishedAt: faker.date.past().toISOString(),
    closeDate: faker.date.future().toISOString(),
    gender: faker.helpers.arrayElement(['Male', 'Female', 'Any']),
    qualification: faker.helpers.arrayElement([
      "Bachelor's Degree",
      "Master's Degree",
      'High School',
      'None',
    ]),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    jobCategoryId: faker.database.mongodbObjectId(),
    jobTypeId: faker.database.mongodbObjectId(),
    jobIndustryId: faker.database.mongodbObjectId(),
    jobLevelId: faker.database.mongodbObjectId(),
    jobLocationId: faker.database.mongodbObjectId(),
    jobSalaryId: faker.database.mongodbObjectId(),
    communesId: faker.database.mongodbObjectId(),
    districtsId: faker.database.mongodbObjectId(),
    provinceCityId: faker.database.mongodbObjectId(),
  }));
}

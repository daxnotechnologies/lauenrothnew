import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `https://cdn-icons-png.flaticon.com/512/0/375.png`,
  name: `${index + 1} Videos`,
  company: sample(['Workout', 'Information']),
  isVerified: faker.datatype.boolean(),
  role: sample(['22,05,2023', '05,01,2022', '12,11,2023']),
}));

export default users;

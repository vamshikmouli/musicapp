import { ISchool } from './school';
import { IStudent } from './student';

export interface IStaff {
  id: string;
  name: string;
  email: string;
  schoolId: string;
  school: ISchool;
  students: IStudent[];
}

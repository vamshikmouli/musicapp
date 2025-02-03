import { IStudent } from './student';

export interface IAttendance {
  id: string;
  studentId: string;
  student: IStudent;
  date: Date;
  status: string;
}

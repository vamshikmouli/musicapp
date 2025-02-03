import { ISchool } from './school';
import { IStaff } from './staff';
import { IAttendance } from './attendance';

export interface IStudent {
  id: string;
  studentId: string;
  name: string;
  schoolId: string;
  school: ISchool;
  staff?: IStaff;
  staffId?: string;
  attendance: IAttendance[];
}

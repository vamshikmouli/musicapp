import { IStaff } from './staff';
import { IStudent } from './student';

export interface ISchool {
  id: string;
  name: string;
  location?: string | null;
  students?: IStudent[];
  staff?: IStaff[];
}

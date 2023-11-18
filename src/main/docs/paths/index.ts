import { account } from './accounts';
import { accountId } from './accountsId';
import { employee } from './employees';
import { employeeId } from './employeesId';
import { signIn } from './sign-in';
import { signUp } from './sign-up';
import { student } from './students';
import { studentId } from './studentsId';

export default {
  '/sign-up': signUp,
  '/sign-in': signIn,
  '/usuarios': account,
  '/usuarios/{id}': accountId,
  '/alunos': student,
  '/alunos/{id}': studentId,
  '/funcionarios': employee,
  '/funcionarios/{id}': employeeId,
};

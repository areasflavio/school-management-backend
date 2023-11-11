import { MissingParamError } from '@application/errors';
import { badRequest, ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { GetStudentByEmail } from '@domain/use-cases/student';

export class GetStudentByEmailController implements Controller {
  constructor(private readonly getsGetStudentByEmail: GetStudentByEmail) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.params;
      if (!email) {
        return badRequest(new MissingParamError('email'));
      }
      const student = await this.getsGetStudentByEmail.execute(email);
      return ok(student);
    } catch (err) {
      return serverError();
    }
  }
}

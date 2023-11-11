import { MissingParamError } from '@application/errors';
import { badRequest, ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { GetEmployeeByEmail } from '@domain/use-cases/employee';

export class GetEmployeeByEmailController implements Controller {
  constructor(private readonly getsGetEmployeeByEmail: GetEmployeeByEmail) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.params;
      if (!email) {
        return badRequest(new MissingParamError('email'));
      }
      const employee = await this.getsGetEmployeeByEmail.execute(email);
      return ok(employee);
    } catch (err) {
      return serverError();
    }
  }
}

import { MissingParamError } from '@application/errors';
import { badRequest, ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { UpdateEmployee } from '@domain/use-cases/employee';

export class UpdateEmployeeController implements Controller {
  constructor(private readonly updateEmployee: UpdateEmployee) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const data = httpRequest.body;
      if (!id) {
        return badRequest(new MissingParamError('id'));
      }
      await this.updateEmployee.execute(id, data);
      return ok();
    } catch (err) {
      if (err instanceof Error) {
        return badRequest(err);
      }
      return serverError();
    }
  }
}

import { MissingParamError } from '@application/errors';
import { badRequest, ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { GetStudentById } from '@domain/use-cases/student';

export class GetStudentByIdController implements Controller {
  constructor(private readonly getsGetStudentById: GetStudentById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      if (!id) {
        return badRequest(new MissingParamError('id'));
      }
      const student = await this.getsGetStudentById.execute(id);
      return ok(student);
    } catch (err) {
      return serverError();
    }
  }
}

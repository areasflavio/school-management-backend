import { MissingParamError } from '@application/errors';
import { badRequest, ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { UpdateStudent } from '@domain/use-cases/student';

export class UpdateStudentController implements Controller {
  constructor(private readonly updateStudent: UpdateStudent) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const avatar = httpRequest.base64File ?? null;
      const data = {
        ...httpRequest.body,
        avatar,
      };
      if (!id) {
        return badRequest(new MissingParamError('id'));
      }
      await this.updateStudent.execute(id, data);
      return ok();
    } catch (err) {
      if (err instanceof Error) {
        return badRequest(err);
      }
      return serverError();
    }
  }
}

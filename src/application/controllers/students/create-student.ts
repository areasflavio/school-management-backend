import { MissingParamError } from '@application/errors';
import {
  badRequest,
  created,
  serverError,
} from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { CreateStudent } from '@domain/use-cases/student';

export class CreateStudentController implements Controller {
  constructor(private readonly createStudent: CreateStudent) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = [
        'matricula',
        'nome',
        'status',
        'serie',
        'email',
        'nascimento',
        'sexo',
        'endereco',
        'emailResponsavel',
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const {
        email,
        nome,
        CPF,
        emailResponsavel,
        endereco,
        matricula,
        nascimento,
        nomeMae,
        nomePai,
        RG,
        serie,
        sexo,
        status,
        telefoneMae,
        telefonePai,
      } = httpRequest.body;
      const avatar = httpRequest.base64File ?? null;
      await this.createStudent.execute({
        email,
        nome,
        CPF,
        emailResponsavel,
        endereco,
        matricula: Number(matricula),
        nascimento,
        nomeMae,
        nomePai,
        RG,
        serie,
        sexo,
        status,
        telefoneMae,
        telefonePai,
        avatar,
      });
      return created();
    } catch (err) {
      if (err instanceof Error) {
        return badRequest(err);
      }
      return serverError();
    }
  }
}

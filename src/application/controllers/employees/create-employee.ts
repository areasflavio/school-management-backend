import { MissingParamError } from '@application/errors';
import {
  badRequest,
  created,
  serverError,
} from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { CreateEmployee } from '@domain/use-cases/employee';

export class CreateEmployeeController implements Controller {
  constructor(private readonly createEmployee: CreateEmployee) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = [
        'registro',
        'nome',
        'email',
        'status',
        'vinculo',
        'admissao',
        'cargo',
        'RG',
        'CPF',
        'nascimento',
        'sexo',
        'escolaridade',
        'endereco',
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const {
        registro,
        nome,
        email,
        status,
        vinculo,
        admissao,
        cargo,
        RG,
        CPF,
        nascimento,
        sexo,
        escolaridade,
        endereco,
      } = httpRequest.body;
      await this.createEmployee.execute({
        admissao,
        cargo,
        CPF,
        email,
        endereco,
        escolaridade,
        nascimento,
        nome,
        registro,
        RG,
        sexo,
        status,
        vinculo,
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

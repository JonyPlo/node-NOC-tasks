import 'dotenv/config'
import * as env from 'env-var'

// La libreria env-var toma las variables del archivo .env y las convierte o parsea a su tipo de valor real, por ejemplo si tenemos una variable de entorno llamada PORT y su valor es 3000 necesitamos que ese valor no sea tipo string si no tipo number, entonces usamos la libreria env-var para convertir ese string 3000 a un number, lo mismo podemos hacer con booleanos, etc.
export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
  PROD: env.get('PROD').required().asBool(),
}

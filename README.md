# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con Typescript

# Dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno

```env
PORT=3000
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false
```

3. Ejecutar el comando `pnpm install` para instalar las dependencias
4. Levantar las bases de datos con el comando `docker compose up -d`
5. Ejecutar el comando `pnpm dlx prisma migrate dev`
6. Ejecutar el comando `pnpm run dev`

## Obtener GMail Key

[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)

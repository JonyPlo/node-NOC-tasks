interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceUseCase {
  // Dentro de este constructor estamos haciendo algo que se llama inyeccion de dependencias, y una inyeccion de dependencias no es mas que los 'casos de uso' reciban las dependencias que necesitan para poder funcionar
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)

      if (!req.ok) {
        throw new Error(`Error on check service ${url}`)
      }

      console.log(`Success on check service ${url}`)

      this.successCallback()

      return true
    } catch (error) {
      console.log(`${error}`)

      this.errorCallback(`${error}`)
      return false
    }
  }
}

export class Persona {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public telefono: any,
    public rut: any,
    public direccion: {
      calle: string;
      comuna: {
        id: number;
        nombre: string;
      };
      numero: number;
    },
    public activo: number
  ) {}
}

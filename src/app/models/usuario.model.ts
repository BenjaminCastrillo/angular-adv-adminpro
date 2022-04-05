export class Usuario{

  constructor(
    public email: string,
    public nombre: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
    )
    {}
}
export class User {
  constructor(
    public id: string | null,
    public name: string,
    public lastname: string,
    public email: string,
    public role: string
  ) {}
}

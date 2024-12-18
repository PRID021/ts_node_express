import { Model } from "sequelize";

export default class RefreshToken extends Model {
  public id!: number;
  public user_id!: number;
  public refresh_token!: string;
  public expires_at!: Date;
  public created_at!: Date;
  public updated_at!: Date;
}

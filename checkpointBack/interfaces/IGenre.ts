import { RowDataPacket } from 'mysql2';

export default interface IGenre extends RowDataPacket {
  name: string;
}
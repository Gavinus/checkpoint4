import { RowDataPacket } from 'mysql2';

export default interface IGame extends RowDataPacket {
  title: string;
  idGenre: number;
  adultOnly: boolean;
  rate: number;
}

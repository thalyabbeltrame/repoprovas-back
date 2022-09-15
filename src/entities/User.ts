import { UserRequestDTO } from '../dtos/UserRequestDTO';
import { bcryptUtils } from '../utils/bcryptUtils';

export class User {
  public email: string;
  public password: string;

  constructor(props: UserRequestDTO) {
    this.email = props.email;
    this.password = bcryptUtils.encryptData(props.password);
  }
}

import { UserRequestDTO } from '../dtos/UserRequestDTO';
import { bcryptUtils } from '../utils/bcryptUtils';

export class User {
  readonly email: string;
  readonly password: string;

  constructor(props: UserRequestDTO) {
    this.email = props.email;
    this.password = bcryptUtils.encryptData(props.password);
  }
}

import { InsertTestDTO } from '../dtos/TestRequestDTO';

export class Test {
  readonly name: string;
  readonly pdfUrl: string;
  readonly categoryId: number;
  readonly teacherDisciplineId: number;

  constructor(props: InsertTestDTO) {
    this.name = props.name;
    this.pdfUrl = props.pdfUrl;
    this.categoryId = props.categoryId;
    this.teacherDisciplineId = props.teacherDisciplineId;
  }
}

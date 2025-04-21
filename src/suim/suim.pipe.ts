import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SuimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.bread = `수임이 ${value.bread} 빵`;
    value.coffee = `수임이 ${value.coffee} 커피`;
    return value;
  }
}

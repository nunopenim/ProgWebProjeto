import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'missingData'
})
export class MissingDataPipe implements PipeTransform {

  transform(value: any, missingChar: string = '-'): any {
    return value ? value : missingChar;
  }

}

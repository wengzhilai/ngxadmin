import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'JsonFilter'
})
export class JsonFilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: any, type: number = 0): any[] {
    if (!items) return [];
    if (type == 0) {
      return items.filter(it => it[field] == value);
    }
    else {
      return items.filter(it => it[field] != value);
    }
  }
}

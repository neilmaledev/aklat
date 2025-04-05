import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'arrayFilter',
    standalone: false
})
export class ArrayFilterPipe implements PipeTransform {

    public transform<T>(items: Array<T>, filterHook: (item: T) => boolean): Array<T> {
        if (!items || !filterHook) {
            return items;
        }
        return items.filter(item => filterHook(item));
    }

}

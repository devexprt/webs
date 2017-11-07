import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(faqs: any[], filter: Object): any {
        if (!faqs || !filter) {
            return faqs;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return faqs.filter(item => item.question.indexOf(filter) !== -1);
    }
}


// export class MyFilterPipe implements PipeTransform {
//     transform(items: any[], filter: Object): any {
//         if (!items || !filter) {
//             return items;
//         }
//         // filter items array, items which match and return true will be kept, false will be filtered out
//         return items.filter(item => item.title.indexOf(filter.title) !== -1);
//     }
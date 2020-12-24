import {PageableDto} from "./pageable-dto";
import {SortDto} from "./sort-dto";

export interface PageDto {
    content: Array<any>;
    pageable: PageableDto;
    totalElements: number;
    totalPages: number;
    last: boolean;
    number: number;
    size: number;
    sort: SortDto;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

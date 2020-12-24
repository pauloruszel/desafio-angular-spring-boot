export interface PaginacaoDTO {
    currentPage: number;
    pageSize: number;
    sortItem?: any;
    totalResults?: number;
    filtros?: any;
    itens?: Array<any>;
}

// filterTypes.ts
export interface Filter {
    column: string;
    value: any;
    operation: string;
    joinTable?: string | null;
}

export interface FilterState {
    globalOperator: 'AND' | 'OR';
    specsDto: Filter[];
}

export interface RootFilterState {
    [key: string]: FilterState;
}

export type GenderData = {
    gender: string;
    percent: string;
    totalAmount: string;
};

export type ChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
    genders: GenderData[];
    tableFooter: {
        totalAmount: string;
        percent: string;
    };
};

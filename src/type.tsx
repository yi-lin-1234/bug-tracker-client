export type Bug = {
  id: string;
  name: string;
  category: string;
  description: string;
};

export type Body = {
  name: string;
  category: string;
  description: string;
};

export type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderWidth: number;
  }>;
};

export type GroupedDataObj = {
  category: string;
  count: number;
};

export type GroupedAttribute = {
  [key: string]: number;
};

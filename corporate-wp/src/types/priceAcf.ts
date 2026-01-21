export interface PriceProps{ 
  acf: {
    heading: string;
    text: string;
  }
}

export type TableRow = {
  title: string;
  range: string;
  duration: string;
  price: string;
  note: string;
};

export type TableGroup = {
  heading: string;
  rows: TableRow[];
};

export type WPPricePage = {
  id: number;
  title: { rendered: string };
  acf: {
    price_acf_table_json: string;
  };
};
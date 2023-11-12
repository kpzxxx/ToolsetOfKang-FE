declare namespace Finance {
  type FinanceRecord = {
    id: number;
    date: string;
    type: string;
    amount: number;
    remark?: string;
  };
}

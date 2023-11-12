import { Request, Response } from 'express';

function financeList(req: Request, res: Response, url: string) {
  const { current = 1, pageSize = 20 } = req.query;
  const dataSource = [
    {
      id: 1,
      date: '2023-11-11',
      type: 'out',
      amount: '20.51',
      remark: 'Hema',
    },
    {
      id: 2,
      date: '2023-11-11',
      type: 'in',
      amount: '20458.91',
      remark: 'Salary',
    },
  ];
  const result = {
    data: dataSource,
    total: 2,
    success: true,
    pageSize,
    current,
  };
  res.json(result);
}
export default {
  'GET /api/finance/list': financeList,
};

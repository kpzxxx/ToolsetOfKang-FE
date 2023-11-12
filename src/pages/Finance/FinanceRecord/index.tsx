import { financeRecordPage } from '@/services/ant-design-pro/api';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React from 'react';

const FinanceRecord: React.FC = () => {
  const typeEnum = {
    in: {
      text: '收入',
      status: 'error',
    },
    out: {
      text: '支出',
      status: 'success',
    },
  };
  const columns: ProColumns<Finance.FinanceRecord>[] = [
    {
      dataIndex: 'date',
      title: '日期',
      onCell: (_, index) => {
        if (index === 0) {
          return { rowSpan: 2 };
        } else {
          return { rowSpan: 0 };
        }
      },
      valueType: 'date',
    },
    {
      dataIndex: 'type',
      title: '类型',
      valueEnum: typeEnum,
    },
    {
      dataIndex: 'amount',
      title: '数额',
      search: false,
      render: (dom, entity) => {
        return (
          <div key={entity.id} style={{ color: entity.type === 'in' ? 'red' : 'green' }}>
            {entity.amount}
          </div>
        );
      },
    },
    {
      dataIndex: 'remark',
      title: '备注',
      search: false,
    },
  ];
  return (
    <PageContainer>
      <ProTable columns={columns} request={financeRecordPage} rowKey={'id'} />
    </PageContainer>
  );
};
export default FinanceRecord;

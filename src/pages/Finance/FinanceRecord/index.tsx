import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React from 'react';

const FinanceRecord: React.FC = () => {
  const columns: ProColumns<Finance.FinanceRecord>[] = [{}];
  return (
    <PageContainer>
      <ProTable columns={columns} />
    </PageContainer>
  );
};
export default FinanceRecord;

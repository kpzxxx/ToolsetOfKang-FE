import { countByAlpha } from '@/services/ant-design-pro/api';
import { Radar } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

type RadarData = {
  name: string;
  value: string;
};

const WordStatistics: React.FC = () => {
  const [data, setData] = useState<RadarData[]>([]);

  useEffect(() => {
    countByAlpha().then((data) => {
      let temp = data.data.children;
      temp = temp.sort((a: RadarData, b: RadarData) => a.name > b.name);
      setData(temp);
    });
  }, []);

  const config = {
    data: data,
    xField: 'name',
    yField: 'value',
    appendPadding: [0, 10, 0, 10],
    meta: {
      star: {
        alias: '数量',
        min: 0,
        nice: true,
        // formatter: (v:any) => Number(v).toFixed(2),
      },
    },
    xAxis: {
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启辅助点
    point: {
      size: 2,
    },
    area: {},
  };

  return (
    <PageContainer>
      <Row>
        <Col>
          <Radar {...config} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default WordStatistics;

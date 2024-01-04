import {countByAlpha} from '@/services/ant-design-pro/api';
import {Column, Radar} from '@ant-design/plots';
import {PageContainer} from '@ant-design/pro-components';
import {Card, Col, Row} from 'antd';
import React, {useEffect, useState} from 'react';

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

  const columnConfig = {
    data,
    xField: 'name',
    yField: 'value',
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    // slider: {
    //   start: 0,
    //   end: 1,
    // },
  };

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
          <Card title={'按首字母统计(柱状)'}>
            <Column {...columnConfig} width={600} height={300} />
          </Card>
        </Col>
        <Col offset={1}>
          <Card title={'按首字母统计(雷达)'}>
            <Radar {...config} width={600} height={300} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default WordStatistics;

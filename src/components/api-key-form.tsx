import { Button, Card, Form, FormProps, Input } from 'antd';
import Image from 'next/image';
import styled from '@emotion/styled';

const Flexbox = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  height: 280px;
  padding: 48px 0;

  .ant-card-body {
    padding: 12px 24px;
  }
`;

export const ApiKeyForm = ({ onFinish }: Pick<FormProps, 'onFinish'>) => (
  <div>
    <Form
      autoComplete={'off'}
      labelCol={{ span: 8 }}
      name={'basic'}
      onFinish={onFinish}
      style={{ width: 800 }}
      wrapperCol={{ span: 12 }}
    >
      <Form.Item
        label={'Your API key'}
        name={'apiKey'}
        rules={[{ message: 'Please input your API key!', required: true }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
        <Button htmlType={'submit'} type={'primary'}>
          {'Save'}
        </Button>
      </Form.Item>
    </Form>

    <Flexbox>
      {['Go to Clickup settings', '"Apps" section', 'Generate and copy API key'].map(
        (step, index) => (
          <Card
            cover={
              <div style={{ height: 234, position: 'relative' }}>
                <Image
                  alt={step}
                  fill
                  src={`/images/step-${index + 1}.png`}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            }
            key={step}
          >
            <div>{step}</div>
          </Card>
        )
      )}
    </Flexbox>
  </div>
);

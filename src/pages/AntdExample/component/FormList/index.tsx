// import React, { useState } from 'react';
import { Form, Col, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FormListItem from '../FormListItem';

type FormListItemData = {
  key: number;
  name: number;
  fieldKey: number;
  isListField: true;
  first: string;
  last: string;
};

const formListInitValues: FormListItemData[] = [
  {
    key: 0,
    name: 0,
    fieldKey: 0,
    isListField: true,
    first: 'tian',
    last: 'jin',
  },
];

export default function FormlistDemo() {
  const onFormFinish = (values: any) => {
    console.log(values);
  };

  const [ form ] = Form.useForm();

  const add = () => {
    const formListValue = form.getFieldsValue().formList as FormListItemData[];
    const len = formListValue.length;
    form.setFieldsValue({
      formList: [
        ...formListValue,
        {
          key: len,
          name: len,
          fieldKey: len,
          isListField: true,
          first: len,
          last: len,
        },
      ],
    });
  };

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 6 }}
      form={form}
      initialValues={{ formList: formListInitValues }}
      onFinish={onFormFinish}
    >
      <DndProvider backend={HTML5Backend}>
        <Form.List name="formList">
          {(fields, { remove, move }) => {
            const moveCard = (from: number, to: number) => {
              console.log('from: %s,to: %s', from, to);
              move(from, to);
            };
            return (
              <>
                {fields.map(({ key, name, ...restField }, index) => {
                  return (
                    <FormListItem
                      key={key}
                      index={index} // dnd 内部的数组 index，如果不加，则会出现闪动的情况
                      id={name}
                      name={name}
                      moveCard={moveCard}
                      remove={remove}
                      restField={restField}
                    />
                  );
                })}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </DndProvider>
      <Row>
        <Col span={8} offset={20}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { ProFormInstance } from '@ant-design/pro-form/lib';
import React, { Dispatch, SetStateAction, useRef } from 'react';

export type UpdateWordProps = {
  word: Partial<WordBook.AddWord>;
  updateModalOpen: boolean;
  onCancel: Dispatch<SetStateAction<boolean>>;
  onSubmit: (word: WordBook.AddWord) => Promise<boolean>;
};

const UpdateWord: React.FC<UpdateWordProps> = (props) => {
  const formRef = useRef<ProFormInstance>();

  const changeForm = () => {
    formRef.current?.setFieldsValue({
      word: props.word.word,
      meaning: props.word.meaning,
    });
  };
  return (
    <ModalForm
      title="Update word"
      width="400px"
      formRef={formRef}
      open={props.updateModalOpen}
      isKeyPressSubmit={true}
      onOpenChange={(visible) => {
        if (visible) {
          changeForm();
        }
        return props.onCancel(visible);
      }}
      onFinish={async (value) => {
        await props.onSubmit(value as WordBook.AddWord);
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: 'Word is required',
          },
        ]}
        width="md"
        name="word"
        label={'Word'}
        disabled
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: 'Meaning is required',
          },
        ]}
        width="md"
        name="meaning"
        label={'Meaning'}
      />
    </ModalForm>
  );
};

export default UpdateWord;

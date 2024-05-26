import React, { useImperativeHandle } from 'react';

import { Form, Input, Modal, Switch } from 'antd';
import { forwardRef } from 'react';

const UserEditForm = forwardRef(({ initialValues }, ref) => {
    const [form] = Form.useForm();

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    useImperativeHandle(ref, () => form, []);

    return (
        <Form 
            layout="horizontal" labelCol={{span: 4}} wrapperCol={{span: 20}}
            form={form} initialValues={initialValues} preserve={false}
        >
            <Form.Item name="id" label="编号">
                <Input type="number" disabled/>
            </Form.Item>
            <Form.Item name="username" label="账号"
                rules={[
                    {
                        required: true,
                        message: '请输入账号',
                    },
                ]}
            >
                <Input disabled={initialValues.id === 1} />
            </Form.Item>
            <Form.Item name="password" label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
            >
                <Input.Password    />
            </Form.Item>
            <Form.Item name="name" label="姓名"
                rules={[
                    {
                        required: true,
                        message: '请输入姓名',
                    },
                ]}
            >
                <Input disabled={initialValues.id === 1} />
            </Form.Item>
            <Form.Item name="email" label="邮箱"
                rules={[
                    {
                        type: 'email',
                        required: true,
                        message: '请输入邮箱',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="enable" label="enable" valuePropName="checked">
                <Switch disabled={initialValues.id === 1} />
            </Form.Item>
        </Form>
    );
});

const UserEditFormModal = ({ open, onCreate, onCancel, initialValues }) => {
    const formRef = React.createRef();

    return (
        <Modal
            open={open}
            title="Edit User"
            okText="Confirm"
            cancelText="Cancel"
            okButtonProps={{
                autoFocus: true,
            }}
            onCancel={onCancel}
            destroyOnClose
            onOk={async () => {
                try {
                    const formInstance = formRef.current;
                    const values = await formInstance?.validateFields();
                    formInstance?.resetFields();
                    onCreate(values);
                } catch (error) {
                    console.log('Failed:', error);
                }
            }}
        >
            <UserEditForm
                ref={formRef}
                initialValues={initialValues}
            />
        </Modal>
    );
};

export default UserEditFormModal;
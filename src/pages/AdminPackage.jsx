import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Table, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const AdminPackages = () => {
    const [packages, setPackages] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await axios.get('http://localhost:3000/apiPackages/package');
            if (Array.isArray(response.data)) {
                setPackages(response.data);
                console.log('Fetched packages:', response.data);
            } else {
                console.error('Unexpected response format:', response.data);
                message.error('Unexpected data format');
            }
        } catch (error) {
            message.error('Error fetching packages');
        }
    };

    const handleAddOrUpdate = async (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price);
    
        if (values.media) {
            values.media.forEach((file) => {
                formData.append('media', file.originFileObj);
            });
        } else {
            console.log('No media files to upload'); 
        }
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found in localStorage');
            }
    
            let response;
            if (editingPackage) {
                response = await axios.put(
                    `http://localhost:3000/apiPackages/package/${editingPackage._id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                message.success('Package updated successfully');
            } else {
                response = await axios.post(
                    'http://localhost:3000/apiPackages/addPackage',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                message.success('Package added successfully');
            }
    
            fetchPackages();
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                message.error('Unauthorized: Please log in again.');
            } else {
                message.error('Error saving package');
            }
        }
    };

    const showDeleteConfirm = (packageId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this package?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => handleDelete(packageId),
        });
    };

    const handleDelete = async (packageId) => {
        try {
            const token = localStorage.getItem('token'); 
            await axios.delete(`http://localhost:3000/apiPackages/package/${packageId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            message.success('Package deleted successfully');
            fetchPackages();
        } catch (error) {
            message.error('Error deleting package');
        }
    };

    const columns = [
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => {
                            setEditingPackage(record);
                            form.setFieldsValue(record);
                            setIsModalVisible(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => showDeleteConfirm(record._id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Add Package
            </Button>
            <Table columns={columns} dataSource={packages} rowKey="_id" />

            <Modal
                title={editingPackage ? 'Edit Package' : 'Add Package'}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingPackage(null);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form form={form} onFinish={handleAddOrUpdate} layout="vertical">
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter a description' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter a price' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="media" label="Upload Media" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
                        <Upload listType="picture" beforeUpload={() => false} multiple>
                            <Button icon={<UploadOutlined />}>Upload (jpg/png/mp4/mov)</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingPackage ? 'Update Package' : 'Add Package'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminPackages;

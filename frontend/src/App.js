import { Container, FormControl, FormLabel, Row, Col, Button } from 'react-bootstrap';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateId, updateTitle, updateDescription } from './Reducer/dataReducer';

import { useReadDataQuery, useCreateDataMutation, useDeleteDataMutation, useUpdateDataMutation } from './Api/dataApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const data = useSelector(state => state.datas);

  const dispatch = useDispatch();

  const { data: serverData, refetch: readData } = useReadDataQuery(id);
  const [ createData, { isLoading: isCreateLoading } ] = useCreateDataMutation();
  const [ deleteData, { isLoading: isDeleteLoading } ] = useDeleteDataMutation();
  const [ updateData, { isLoading: isUpdateLoading } ] = useUpdateDataMutation();

  useEffect(() => {
    setId(data.id);
    setTitle(data.title);
    setDescription(data.description);
  }, []);

  useEffect(() => {
    setId(serverData.id);
    setTitle(serverData.title);
    setDescription(serverData.description);
  }, [serverData]);

  const onChangeId = (e) => {
    setId(e.target.value);
    dispatch(updateId(e.target.value));
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    dispatch(updateTitle(e.target.value));
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
    dispatch(updateDescription(e.target.value));
  };

  const onCreate = async () => {
    await createData({ id, title, description }).unwrap().then(() => {
      toast("Data Created!");
    });
  };
  const onRead = async () => {
    await readData(id).unwrap().then(() => {
      toast("Data Readed!");
    });
  };
  const onUpdate = async () => {
    await updateData({ id, title, description }).unwrap().then(() => {
      toast("Data Updated!");
    });
  };
  const onDelete = async () => {
    await deleteData(id).unwrap().then(() => {
      toast("Data Deleted!");
    });
  };

  return (
    <Container className='m-3 p-3'>
      <Row className='m-1'>
        <Row className='p-1'>
          <Col sm={2}>
            <FormLabel>ID:</FormLabel>
          </Col>
          <Col sm={6}>
            <FormControl type='text' value={id} onChange={(e) => onChangeId(e)}/>
          </Col>
        </Row>
        <Row className='p-1'>
          <Col sm={2}>
            <FormLabel>Title:</FormLabel>
          </Col>
          <Col sm={6}>
            <FormControl type='text' value={title} onChange={(e) => onChangeTitle(e)}/>
          </Col>
        </Row>
        <Row className='p-1'>
          <Col sm={2}>
            <FormLabel>Description:</FormLabel>
          </Col>
          <Col sm={6}>
            <FormControl type='text' value={description} onChange={(e) => onChangeDescription(e)}/>
          </Col>
        </Row>
      </Row>
      <Row className='m-1'>
        <Col sm={2}>
          <Button className='w-100 btn btn-primary' onClick={() => onCreate()}>Create</Button>
        </Col>
        <Col sm={2}>
          <Button className='w-100 btn btn-success' onClick={() => onRead()}>Read</Button>
        </Col>
        <Col sm={2}>
          <Button className='w-100 btn btn-info' onClick={() => onUpdate()}>Update</Button>
        </Col>
        <Col sm={2}>
          <Button className='w-100 btn btn-danger' onClick={() => onDelete()}>Delete</Button>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default App;

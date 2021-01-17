import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../Input';
import { Label } from './styles';
import api from '../../services/api';

interface Dataset {
  field: string;
  type: string;
  value?: any;
}

interface DialogProps {
  config: Dataset[];
  open: boolean;
  close: any;
  save: any;
  title: string;
  data?: object;
  edit: any;
}

const GridDialog: React.FC<DialogProps> = ({
  config,
  open,
  close,
  save,
  title,
  data,
  edit,
  ...rest
}) => {

  const formRef = useRef<FormHandles>(null);
  const [isShow, setShow] = useState(open);
  const [isConfig, setConfig] = useState<Dataset[]>([]);

  useEffect(() => {
    setConfig(config)
  }, [isConfig]);

  useEffect(() => {
    setConfig(config)
  }, [edit]);

  const handlerClose = useCallback(async () => {
    close();
  }, []);

  const handlerSubmit = useCallback(
    async (formData: object) => {
      console.log(formData)
      save(formData)
    }
    , []);

  const handlerOnChage = useCallback(
    async (e: any) => {
      isConfig[e.index].value = e.newValue
      setConfig(oldArray => [...oldArray, isConfig[e.index]]);
    }
    , [isConfig]);

  return (
    <div>
      {/* {
        isConfig?.map((item ) => (
          <label key={item.field}>{item.field}</label>
        ))} */}
      <Modal show={open} onHide={handlerClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pessoas</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlerSubmit}>
          <Modal.Body>
            {isConfig?.map((item, index) => (
              <div key={item.field}>
                <Label>{item.field}</Label>

                {((item.field === "Id") || (item.field === "id")) ? (
                  <Input name={item.field} type={item.type} value={item.value} disabled style={{ cursor: "not-allowed" }}></Input>
                ) : (
                    // <Input name={item.field} type={item.type} value={item.value} onChange={(e) => {handlerOnChage({index: index, newValue: e.target.value})}}></Input>
                    <Input name={item.field} type={item.type} value={item.value} onChange={(e) => { handlerOnChage({ index: index, newValue: e.target.value }) }}></Input>

                  )}

              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlerClose} >
              Fechar
          </Button>
            <Button variant="primary" type="submit" onClick={handlerClose}>
              Salvar
          </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default GridDialog;

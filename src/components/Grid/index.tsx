import React, {
  TableHTMLAttributes,
  useRef,
  useCallback,
  useState,
  useEffect
} from 'react';
import { FiArrowLeft, FiArrowRight, FiSearch, FiPrinter } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Table, FooterTable, HeaderGrid } from './styles';
import Input from '../Input';
import Button from '../Button';
import GridDialog from '../GridDialog';
import api from '../../services/api';
interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  resources: object;
  title: string;
}

interface DataDialog {
  field: string;
  type: string;
}
interface RemoveObject {
  id: any;
}

const Grid: React.FC<TableProps> = ({
  resources,
  title,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<FormHandles>(null);
  const [isHeader, setHeader] = useState(Object.keys(resources));
  const [isPageSize, setPageSize] = useState(1);
  const [isData, setData] = useState<object[]>([]);
  const [isShowDialog, setShowDialog] = useState(false);
  const [isConfigDialog, setConfigDialog] = useState<DataDialog[]>([]);
  const [isDataDialog, setDataDialog] = useState<object>([]);
  const [isRelease, setRelease] = useState<boolean>(false);
  const numberOfPages = 10;

  useEffect(() => {
    api
      .get<object[]>('/' + title, {})
      .then((response) => {
        setData(response.data)
      });

    Object.entries(resources).forEach(e => {
      setConfigDialog(oldArray => [...oldArray, { field: e[0], type: e[1], value: "" }]);
    });

  }, []);

  const handlerNextPage = useCallback(async () => {
    if (isPageSize + 1 <= numberOfPages) {
      setPageSize(isPageSize + 1);
    }
  }, [isPageSize]);

  const handlertPrevPage = useCallback(async () => {
    if (isPageSize - 1 >= 1) {
      setPageSize(isPageSize - 1);
    }
  }, [isPageSize]);

  const handlertOpenDialog = useCallback(async () => {
    setConfigDialog([]);

    Object.entries(resources).forEach(element => {
      setConfigDialog(oldArray => [...oldArray, { field: element[0], type: element[1], value:""}]);
    });


    var temp = !isShowDialog;
    setShowDialog(temp)
    console.log(isShowDialog)
    setShowDialog(true)
  }, [isShowDialog]);

  const handlerCloseDialog = useCallback(async () => {
    setShowDialog(false)
  }, []);

  const handlerSaveDialog = useCallback(async (formData: object) => {
    var _formData = Object.entries(formData);
    var edit: boolean = true;

    Object.entries(resources).forEach(r => {
      _formData.forEach(f => {
        if (r[0] === f[0]) {
          if (r[1] === 'number') {
            f[1] = parseInt(f[1]);
          }
          if((f[0] === "id")||(f[0] === "Id")){
            if(isNaN(f[1])){
              edit = false;
            }
          }
        }
      });
    });


    console.log(Object.fromEntries(_formData))

   var response = edit ? await api.put('/' + title, Object.fromEntries(_formData)) : await api.post('/' + title, Object.fromEntries(_formData));
 
    // setData(oldArray => [...oldArray, Object.fromEntries(_formData)]);
  }, []);

  const handlerEdit = useCallback(async (edit: object) => {
    setConfigDialog([]);
    var _edit = Object.entries(edit);
    var count = 0;

    Object.entries(resources).forEach(element => {
      var value = _edit[count][1].toString()
      setConfigDialog(oldArray => [...oldArray, { field: element[0], type: element[1], value: value }]);
      count++;
    });
    //console.log(isConfigDialog)
    setShowDialog(true)
  }, [isConfigDialog])

  const handlerRemove = useCallback(async (_obj: any) => {
    //console.log(_obj[])
    const { id } = _obj;
    console.log(id)
    var response = await api.delete('/' + title + '/'+ id);
  }, [])


  const edit = useCallback(async (edit: object) => {
    //console.log(isConfigDialog)
    //setConfigDialog([]);
  }, [])

  return (
    <Container>
      <GridDialog
        config={isConfigDialog}
        open={isShowDialog}
        close={handlerCloseDialog}
        title={title}
        save={handlerSaveDialog}
        data={isDataDialog}
        edit={() => edit({})}
      >
      </GridDialog>
      <HeaderGrid>
        <Form
          ref={formRef}
          onSubmit={handlertPrevPage}
          onKeyPress={handlertPrevPage}
        >
          <Input
            name="search"
            icon={FiSearch}
            type="text"
            placeholder="Search"
          />
        </Form>
        <Button onClick={handlertOpenDialog}>
        
          Adicionar
        </Button>

      </HeaderGrid>
      <Table>
        <thead>
          <tr>
            {isHeader?.map((item) => (
              <th key={item}>{item}</th>
            ))}
            <th>Editar</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {isData?.map((element) => (
            <tr>
              {Object.values(element)?.map((e) => (
                <td key={e.Id}>{e}</td>
              ))}
              <td><button type="button" onClick={() => handlerEdit(element)} className="btn btn-warning">Editar</button></td>
              <td><button onClick={() => handlerRemove(element)} className="btn btn-danger">Remove</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <FooterTable>
        {isPageSize === 1 ? (
          <FiArrowLeft onClick={handlertPrevPage} cursor="no-drop" />
        ) : (
            <FiArrowLeft onClick={handlertPrevPage} cursor="pointer" />
          )}

        <strong>Page {isPageSize} to 10</strong>
        <FiArrowRight onClick={handlerNextPage} cursor="pointer" />
      </FooterTable> */}
    </Container>
  );
};

export default Grid;

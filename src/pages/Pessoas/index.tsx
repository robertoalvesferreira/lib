import React, {useEffect, useState} from 'react';

import { Link, useHistory } from 'react-router-dom';
import { string } from 'yup';
import Grid from '../../components/Grid'

interface PessoasData{
  Id: string;
  Nome: string;
  CPF: string;
}

interface Props{
  msg?: string;
}

const Pessoas: React.SFC<Props> = (props) => {

  const [isResources, setResources] = useState<object>({Id:"number", Nome:"string", CPF:"string" , Telefone:"string"});

  
  return(
    <div>
      <Grid
          title={"Pessoas"}
          resources={isResources}

        />
    </div>
  )
}
export default Pessoas;
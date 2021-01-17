import styled from 'styled-components';

export const Container = styled.div``;

export const Table = styled.table`
  align-items: center;
  /* border: 1px solid; */
  margin: auto;
  padding: 10px;

  th {
    min-width: 150px;
    /* border: 1px solid; */
    margin: auto;
    padding: 10px;
  }
  td {
    text-align: left;
    align-items: center;
    /* border: 1px solid; */
    margin: auto;
    padding: 10px;
  }

  text {
    margin-left: 50%;
    margin-right: 50%;
  }

  svg {
    cursor: pointer;
    margin-left: 50%;
    margin-right: 50%;
  }

  strong {
    margin: auto auto;
  }
`;
export const HeaderGrid = styled.div`
  max-width:900px;
  /* border: 1px solid; */
  margin: auto;
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  text-align: center;
  /* border: 1px solid; */
  /* padding: 10px; */

  button {
    max-width: 125px;
    max-height: 40px;
    /* margin: 0 15px 0 0; */
    margin-left: 10px;
    margin-top: 0px;
  }
`;

export const FooterTable = styled.div`
  max-width: 1120px;
  display: flex;
  align-items: center;
  margin-left: auto;
  /* border: 1px solid; */

  svg {
    margin-left: auto;
    margin-right: auto;
    /* cursor: pointer; */
  }
`;

import './App.css';
import { useRecoilState } from 'recoil';
import { endpointData, tagsState } from './services/atoms'
import { Alert, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { EndpointDataTyp as EndpointDataType, SingleTag, TagsStateType } from './services/enums';

export function TagsComponent() {
  const [data] = useRecoilState<TagsStateType>(tagsState);
  const [endpoint] = useRecoilState<EndpointDataType>(endpointData);

  return (
    <div className="Tags-container">
      {data.loading ? (
        <CircularProgress sx={{padding: '20px'}}/>
      ) : data.error ? (
        <div className='control-label'>
          <Alert variant="filled" severity="error" sx={{padding: '20px'}}>
            Trafiliśmy na błąd: {data.error?.status} {data.error?.message}
          </Alert>
        </div>
      ) : (
        <div className='table-container'>
          <TableContainer component={Paper} sx={{borderRadius: '10px'}}>
            <Table aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell ># </TableCell>
                  <TableCell>Nazwa</TableCell>
                  <TableCell>Wzmianki</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.tags.map((row: SingleTag, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {index + 1 + ((endpoint.page -1) * endpoint.pagesize)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.count}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

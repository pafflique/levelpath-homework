import {Button, Container, CssVarsProvider, Stack} from '@mui/joy';
import {Birth} from '../domain/birth';
import ErrorModal from './ErrorModal';
import BirthList from './BirthList';

interface ViewModel {
  list: Birth[];
  loading: boolean;
  error: {
    text: string | null;
    show: boolean;
  };
  fetch: () => void;
  close: () => void;
}

function View({loading, error, list, fetch, close}: ViewModel) {
  return (
    <CssVarsProvider>
      <Container maxWidth="sm">
        <Stack spacing={2} padding={2}>
          <Button variant="solid" onClick={fetch} disabled={loading}>Fetch</Button>
          <BirthList loading={loading} list={list}/>
        </Stack>
      </Container>
      <ErrorModal isOpen={error.show} close={close} error={error.text}/>
    </CssVarsProvider>
  );
}

export default View;

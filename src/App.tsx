import './App.css';
import { useRecoilState } from 'recoil';
import { tagsState } from './services/atoms'
import { TagsComponent } from './Tags';
import { useFetchData as useFetchTagsData } from './services/hooks'
import { TagsStateType } from './services/enums';
import { ControlPanelComponent } from './Contol-Panel';
import { ThemeProvider, createTheme } from '@mui/material';
import { teal, lime } from '@mui/material/colors';

function App() {
  const [data, setTags] = useRecoilState<TagsStateType>(tagsState);


  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: lime,
    },
  });


  useFetchTagsData(data, setTags);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className='Top-container'>
          <ControlPanelComponent />
        </div>
        <div>
          <TagsComponent />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

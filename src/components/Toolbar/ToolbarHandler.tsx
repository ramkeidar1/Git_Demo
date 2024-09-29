import {AppBar, Toolbar, IconButton, Button} from "@mui/material";
  
const LIST_OF_ELEMENTS_IN_JSON = ["Authentication", "Branch", "Build", "Copy", "VVD"]

interface ToolBarProps {
  HandleWantedTabHandle: (arg1: string, arg2: boolean) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ HandleWantedTabHandle }) => {

    const mappedToolBarLists = LIST_OF_ELEMENTS_IN_JSON.map((item, index) => (
        <Button key={index} color="inherit" onClick={() => HandleWantedTabHandle(item, true)}
          sx={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '200px', 
            height: '50px',
            marginBottom: '20px'  
          }}>
          {item}  
        </Button>
      ));

  
return (
      <AppBar position="static" sx={{ width: '200px', position: 'relative', justifyContent: 'center', alignItems: 'center',borderRadius: '16px', height:'400px'}}> 
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'flex-start', height: '100%', zIndex: 1300 }}> 
        <IconButton sx={{ flexDirection: 'column', alignItems: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
          </IconButton> 
              {mappedToolBarLists}
        </Toolbar> 
      </AppBar> 
  ); 
}

export default ToolBar;
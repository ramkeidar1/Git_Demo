import {AppBar, Toolbar, IconButton, Typography, Button, Box} from "@mui/material";
  
const LIST_OF_ELEMENTS_IN_JSON = ["Log in", "Select Branch", "Build", "Copy To Target", "Generete VVD"]



interface ToolBarProps {
    mainBarStatusFunc: any;
}

const ToolBar: React.FC<ToolBarProps> = ({ mainBarStatusFunc }) => {

    const mainBarStatusHandle = (index: number) => {
        mainBarStatusFunc((mainBarStatus: boolean[]) => 
            mainBarStatus.map((value, i) => 
            i === index ? true : value  
          )
        );
      };

    const mappedToolBarLists = LIST_OF_ELEMENTS_IN_JSON.map((item, index) => (
        <Button
          key={index}
          color="inherit"
          onClick={() => mainBarStatusHandle(index)}
          sx={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '200px', 
            height: '50px',
            marginBottom: '20px'  
          }}>
          {item}  {/* Correctly placing the children (text) inside the Button */}
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
import Header from "./components/Header/Header"
import Authentication from "./components/Authentication/Authentication"
import BrachHandler from "./components/BranchHandler/BranchHandler"
import CopyHandler from "./components/CopyHandel/CopyHandler"
import VersionDescriptionDocument from "./components/VersionDescriptionDocument/VersionDescriptionDocument"
import { useState } from "react"
import BaseModelWrapper from "./components/Model/BaseModelWrapper"
import BuildHandler from "./components/Build/BuildHandler"
import ToolBarHandler from './components/Toolbar/ToolbarHandler'
import { Box } from "@mui/material"

function App() {

  const [login, setLogin] = useState(false)
  const [isAuthenticated, setAuthenticationStatus] = useState(false)
  const [activeUser, setActiveUser] = useState('Guest')
  const [activeUrl, setActiveUrl] = useState('-')

  const [mainBarStatus, setMainBarStatus] = useState([true, false, false, false, false])

  function logInPop() {
    setLogin(!login)
  }
  function logOut() {
    setActiveUser('Guest')
    setActiveUrl('-')
    setAuthenticationStatus(false); 
    setMainBarStatus((mainBarStatus: boolean[]) => 
      mainBarStatus.map((value, i) => 
      i != 0 ? false : value  
    )
  );
  }

  const closeWantedTabHandle = (index: number) => {
    setMainBarStatus((mainBarStatus: boolean[]) => 
      mainBarStatus.map((value, i) => 
      i === index ? false : value  
    )
  );
  };


  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', height: '100vh', padding:'0 0 50px 0' }} > 
      <ToolBarHandler mainBarStatusFunc={setMainBarStatus}/>
      <Box sx={{ flexGrow: 1, marginLeft: '70px', padding: '16px', }}>
        {mainBarStatus[0]?<Authentication loginStatus={isAuthenticated} loginFunc={logInPop} logOutFunc={logOut} activeUser={activeUser} activeUrl={activeUrl} closeFunc={() => {closeWantedTabHandle(0)}}/>: null}
        <BaseModelWrapper isModalVisibile={login} onBackdropClick={logInPop} setAuthenticationStatus={setAuthenticationStatus} setActiveUser={setActiveUser} setActiveUrl={setActiveUrl}/>
        {mainBarStatus[1]?<BrachHandler loginStatus={isAuthenticated} closeFunc={() => {closeWantedTabHandle(1)}}/>: null}
        {mainBarStatus[2]?<BuildHandler loginStatus={isAuthenticated} closeFunc={() => {closeWantedTabHandle(2)}}/>: null}
        {mainBarStatus[3]?<CopyHandler loginStatus={isAuthenticated} closeFunc={() => {closeWantedTabHandle(3)}}/>: null}
        {mainBarStatus[4]?<VersionDescriptionDocument loginStatus={isAuthenticated} closeFunc={() => {closeWantedTabHandle(4)}}/>: null}
      </Box>
    </Box>
    </>
  )
}

export default App

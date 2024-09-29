import { useState } from "react"
import { Box } from "@mui/material"
import Header from "./components/Header/Header"
import BuildHandler from "./components/Build/BuildHandler"
import CopyHandler from "./components/CopyHandel/CopyHandler"
import BrachHandler from "./components/BranchHandler/BranchHandler"
import ToolBarHandler from './components/Toolbar/ToolbarHandler'
import BaseModelWrapper from "./components/Model/BaseModelWrapper"
import Authentication from "./components/Authentication/Authentication"
import VersionDescriptionDocument from "./components/VersionDescriptionDocument/VersionDescriptionDocument"

function App() {

  const [login, setLogin] = useState<boolean>(false) //Sets if log in pop up is open
  const [isAuthenticated, setAuthenticationStatus] = useState<boolean>(false) //Sets if the User it logged in
  const [activeUser, setActiveUser] = useState<string>('Guest') //Sets the username is displayed in the Authentication Bar
  const [activeUrl, setActiveUrl] = useState<string>('-') //Sets the username is displayed in the Authentication Bar

  //Sets the componenets which are rendered to the user
  const [mainBarStatus, setMainBarStatus] = useState<{ [key: string]: boolean }>({'Authentication':true})

  // Hadles if log in pop up is open
  function logInPop() {
    setLogin(!login)
  }

  // Handles the log out option
  function logOut() {
    setActiveUser('Guest')
    setActiveUrl('-')
    setAuthenticationStatus(false); 
    setMainBarStatus({'Authentication':true});
  }

  // Displays the componenets which are rendered to the user
  const HandleWantedTabHandle = ( nameOfElement : string, status: boolean) => {
    setMainBarStatus((mainBarStatus: { [key: string]: boolean }) => {
        const updatedDict = { ...mainBarStatus }; 
        !status ? delete updatedDict[nameOfElement]: updatedDict[nameOfElement] = true;
        return updatedDict; 
    });
  };


  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', height: '100vh', padding:'0 0 50px 0' }} > 
      <ToolBarHandler HandleWantedTabHandle={HandleWantedTabHandle}/>
      <Box sx={{ flexGrow: 1, marginLeft: '70px', padding: '16px', }}>
        {('Authentication' in mainBarStatus)?<Authentication loginStatus={isAuthenticated} loginFunc={logInPop} logOutFunc={logOut} activeUser={activeUser} activeUrl={activeUrl} closeFunc={() => {HandleWantedTabHandle('Authentication', false)}}/>: null}
        <BaseModelWrapper isModalVisibile={login} onBackdropClick={logInPop} setAuthenticationStatus={setAuthenticationStatus} setActiveUser={setActiveUser} setActiveUrl={setActiveUrl}/>
        {('Branch' in mainBarStatus)?<BrachHandler loginStatus={isAuthenticated} closeFunc={() => {HandleWantedTabHandle('Branch', false)}}/>: null}
        {('Build' in mainBarStatus)?<BuildHandler loginStatus={isAuthenticated} closeFunc={() => {HandleWantedTabHandle('Build', false)}}/>: null}
        {('Copy' in mainBarStatus)?<CopyHandler loginStatus={isAuthenticated} closeFunc={() => {HandleWantedTabHandle('Copy', false)}}/>: null}
        {('VVD' in mainBarStatus)?<VersionDescriptionDocument loginStatus={isAuthenticated} closeFunc={() => {HandleWantedTabHandle('VVD', false)}}/>: null}
      </Box>
    </Box>
    </>
  )
}

export default App

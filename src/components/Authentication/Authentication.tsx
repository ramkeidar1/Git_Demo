import TextBar from "../Common/TextBar";
import ElementBox from "../Common/ElementBox";
import { Button, Typography } from "@mui/material";

interface AuthenticationProps {
    loginStatus: boolean; //True is the user is logged in, and false otherwise
    loginFunc: () => void; //True is the log in pop up is open, and false otherwise
    activeUser: string; //The name of the active user
    activeUrl: string; //The name of the active user's URL 
    logOutFunc: () => void; //The function that logs out of the application
    closeFunc: () => void; //The function that stops rendering the component
  }

  const Authentication: React.FC<AuthenticationProps> = ({ loginStatus, loginFunc, activeUser, activeUrl, logOutFunc, closeFunc }) => {
    return (
        <>
        <Typography variant="h6">Authentication</Typography>
        <ElementBox closeFunc={closeFunc}>
            <TextBar label="Username:" currentValue={activeUser} />
            <TextBar label="URL:" currentValue={activeUrl} />
            
            <Button
                type="submit"
                variant="outlined" 
                onClick={!loginStatus ? loginFunc : logOutFunc}>
                {!loginStatus ? 'Log in' : 'Log out'}
            </Button>
        </ElementBox>
        </>
    )
};

export default Authentication
import { Chip, Button, Typography } from "@mui/material";
import TextBar from "../Common/TextBar";
import ElementBox from "../Common/ElementBox";

interface AuthenticationProps {
    loginStatus: boolean; 
    loginFunc: any;
    activeUser: string;
    activeUrl: string;
    logOutFunc: any;
    closeFunc: any;
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
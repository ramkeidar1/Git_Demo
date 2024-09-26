import {Button } from "@mui/material";

interface ButtonHandlerProps {
    buttonName: string;
    buttonFunc: any;
    loginStatus: boolean;
}

const ButtonHandler: React.FC<ButtonHandlerProps> = ({ buttonName, buttonFunc, loginStatus }) => {
    
    return (
        <Button onClick={buttonFunc} variant="outlined" type="submit" disabled={!loginStatus}>
            {buttonName}
        </Button>
    );
};

export default ButtonHandler;
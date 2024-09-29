import {Button } from "@mui/material";

// The button componenet which is used in the Project

interface ButtonHandlerProps {
    buttonName: string; //The name which is dispayed in the button
    buttonFunc: (event: React.FormEvent) => void; //The function which is runned when the button is clicked
    loginStatus: boolean; //The button should only be aviable when a user is logged in, and disable if not
}

const ButtonHandler: React.FC<ButtonHandlerProps> = ({ buttonName, buttonFunc, loginStatus }) => {
    
    return (
        <Button onClick={buttonFunc} variant="outlined" type="submit" disabled={!loginStatus}>
            {buttonName}
        </Button>
    );
};

export default ButtonHandler;
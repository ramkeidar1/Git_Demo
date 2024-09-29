import { useState } from "react";
import TextBox from "../Common/TextBox";
import { Typography } from "@mui/material";
import ElementBox from "../Common/ElementBox";
import ButtonHandler from "../Common/ButtonHandler";
import { copyHandler, updateCopyInfo } from "../Common/DataHandler";

let initialTarget = "Enter the target"

interface CopyHandlerProps {
    loginStatus: boolean; //The function that logs out of the application
    closeFunc: () => void; //The function that stops rendering the component
}

const CopyHandler: React.FC<CopyHandlerProps> = ({ loginStatus, closeFunc }) => {

    const [currentTarget, setCurrentTarget] = useState<string>(''); //The data that is displayed to the user in 'target'
    const [copyUpdatedStatus, setcopyUpdatedStatus] = useState(<></>); //An HTML component that renders the status of the action that the user has done when necessary

    //Handles the user inputs when entering a new target
    function handlenTarget(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentTarget(event.target.value);

    }

    //Fetches the data of the current 'copyToTarget' from JSON and updating the application to be them
    const updateFromJson = async (event: React.FormEvent) => {
        event.preventDefault();
        const lastInfo = await copyHandler();
        setCurrentTarget(lastInfo[0]);
    }

    //Updates the data to the JSON and updates the 'copyUpdatedStatus' to be the result
    const handleUpdateInfo = async (event: React.FormEvent) => {
        event.preventDefault();
        // Call the loginHandler function to check the credentials
        const success = await updateCopyInfo(currentTarget);
    
        if (success == 0) {
            setcopyUpdatedStatus(<Typography color="green">Copy succesfull!</Typography>);
        }
        else if (success == 1) {
            setcopyUpdatedStatus(<Typography color="red">Error fetching data</Typography>);
        }
        else if (success == 2) {
            setcopyUpdatedStatus(<Typography color="red">Please enter an address</Typography>);
        }

    }

    return (
        <>
        <Typography variant="h6">Copy Handler</Typography>
        <ElementBox closeFunc={closeFunc}>
            <TextBox label="Selected Target: " type="text" placeholder={loginStatus? initialTarget: ''} onChange={handlenTarget} currentValue={currentTarget} loginStatus={loginStatus}/>
            <ButtonHandler buttonName="copy" buttonFunc={handleUpdateInfo} loginStatus={loginStatus}/>
            {copyUpdatedStatus}
            <ButtonHandler buttonName="load last info" buttonFunc={updateFromJson} loginStatus={loginStatus}/>
        </ElementBox>
        </>
    )
};

export default CopyHandler
import { Box, Typography } from "@mui/material";
import TextBox from "../Common/TextBox";
import ButtonHandler from "../Common/ButtonHandler";
import { useState } from "react";
import { copyHandler } from "../Common/DataHandler";
import ElementBox from "../Common/ElementBox";
import { updateCopyInfo } from "../Common/DataHandler";

var initialTarget = "Enter the target"

interface CopyHandlerProps {
    loginStatus: boolean;
    closeFunc: any;
}

const CopyHandler: React.FC<CopyHandlerProps> = ({ loginStatus, closeFunc }) => {

    const [currentTarget, setCurrentTarget] = useState<string>('');
    const [copyUpdatedStatus, setcopyUpdatedStatus] = useState(<></>); 

    function handlenTarget(event: any) {
        setCurrentTarget(event.target.value);

    }

    const updateFromJson = async (event: React.FormEvent) => {
        event.preventDefault();
        const lastInfo = await copyHandler();
        setCurrentTarget(lastInfo[0]);
    }

    const handleUpdateInfo = async (event: React.FormEvent) => {
        event.preventDefault();
        // Call the loginHandler function to check the credentials
        const success = await updateCopyInfo(currentTarget);
    
        if (success == 0) {
            console.log('Added successful');
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
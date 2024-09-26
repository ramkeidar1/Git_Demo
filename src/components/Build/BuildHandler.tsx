import { Box, Typography, CircularProgress} from "@mui/material";
import ButtonHandler from "../Common/ButtonHandler";
import TextBox from "../Common/TextBox";
import { useState } from "react"; 
import { buildHandler } from "../Common/DataHandler";
import ElementBox from "../Common/ElementBox";
import { updateBuildInfo } from "../Common/DataHandler";


let initialVersion = "Enter version"
let inititalOutputDir = "Enter the output directory"
let initialBuildCommand = "Enter the build command"


interface BuildHandlerProps {
    loginStatus: boolean;
    closeFunc: any;
}

const BuildHandler: React.FC<BuildHandlerProps> = ({ loginStatus, closeFunc }) => {

    const [currentVersion, setCurrentVersion] = useState<string>('');
    const [currentBuildCommand, setCurrentBuildCommand] = useState<string>('');
    const [currentOutputDir, setCurrentOutputDir] = useState<string>('');
    const [buildUpdatedStatus, setbuildUpdatedStatus] = useState(<></>); 

    function handlenVersion(event: any) {
        setCurrentVersion(event.target.value);
    }

    function handlenCurrentBuildCommand(event: any) {
        setCurrentBuildCommand(event.target.value);
    }

    function handlenCurrentOutputDir(event: any) {
        setCurrentOutputDir(event.target.value);
    }

    const updateFromJson = async (event: React.FormEvent) => {
        event.preventDefault();
        const lastInfo = await buildHandler();
        setCurrentVersion(lastInfo[0]);
        setCurrentBuildCommand(lastInfo[1])
        setCurrentOutputDir(lastInfo[2])
    }

    const handleUpdateInfo = async (event: React.FormEvent) => {
        event.preventDefault();


        setbuildUpdatedStatus(<CircularProgress color="success"></CircularProgress>)
        await new Promise(resolve => setTimeout(resolve, 3000));

        const success = await updateBuildInfo(currentVersion, currentBuildCommand, currentOutputDir);
    
        if (success == 0) {
            console.log('Added successful');
            setbuildUpdatedStatus(<Typography color="green">Build updated!</Typography>);

        }
        else if (success == 1) {
            setbuildUpdatedStatus(<Typography color="red">Error fetching data</Typography>);
        }

        else if (success == 2) {
            setbuildUpdatedStatus(<Typography color="red">Please enter all the data</Typography>);
        }
    }



    return (
        <>
        <Typography variant="h6">Build Handler</Typography>
        <ElementBox closeFunc={closeFunc}>
            <TextBox label="Version: " type="text" placeholder={loginStatus? initialVersion: ''} onChange={handlenVersion} currentValue={currentVersion} loginStatus={loginStatus}/>
            <TextBox label="Build command: " type="text" placeholder={loginStatus? initialBuildCommand: ''} onChange={handlenCurrentBuildCommand} currentValue={currentBuildCommand} loginStatus={loginStatus}/>
            <TextBox label="Output Directory: " type="text" placeholder={loginStatus? inititalOutputDir: ''} onChange={handlenCurrentOutputDir} currentValue={currentOutputDir} loginStatus={loginStatus}/>
            <ButtonHandler buttonName="build" buttonFunc={handleUpdateInfo} loginStatus={loginStatus}/>
            {buildUpdatedStatus}
            <ButtonHandler buttonName="load last info" buttonFunc={updateFromJson} loginStatus={loginStatus}/>
        </ElementBox>
        </>
    )
};

export default BuildHandler
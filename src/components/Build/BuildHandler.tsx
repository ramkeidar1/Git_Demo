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
    loginStatus: boolean; //The function that logs out of the application
    closeFunc: () => void; //The function that stops rendering the component
}

const BuildHandler: React.FC<BuildHandlerProps> = ({ loginStatus, closeFunc }) => {

    const [currentVersion, setCurrentVersion] = useState<string>(''); //The data that is displayed to the user in 'version'
    const [currentBuildCommand, setCurrentBuildCommand] = useState<string>(''); //The data that is displayed to the user in 'build command'
    const [currentOutputDir, setCurrentOutputDir] = useState<string>(''); //The data that is displayed to the user in 'output dir'
    const [buildUpdatedStatus, setbuildUpdatedStatus] = useState(<></>); //An HTML component that renders the status of the action that the user has done when necessary

    //Handles the user inputs when entering a new version
    function handlenVersion(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentVersion(event.target.value);
    }

    //Handles the user inputs when entering a new build command
    function handlenCurrentBuildCommand(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentBuildCommand(event.target.value);
    }
    
    //Handles the user inputs when entering a new output dir
    function handlenCurrentOutputDir(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentOutputDir(event.target.value);
    }

    //Fetches the data of the current 'build' from JSON and updating the application to be them
    const updateFromJson = async () => {
        const lastInfo = await buildHandler();
        setCurrentVersion(lastInfo[0]);
        setCurrentBuildCommand(lastInfo[1])
        setCurrentOutputDir(lastInfo[2])
    }

    
    //Updates the data to the JSON and updates the 'setbuildUpdatedStatus' to be the result
    const handleUpdateInfo = async () => {

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
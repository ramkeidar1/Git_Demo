import { Typography } from "@mui/material";
import TextBox from "../Common/TextBox";
import ButtonHandler from "../Common/ButtonHandler";
import ElementBox from "../Common/ElementBox";
import { useState } from "react";
import { GenerateVVDHandler } from "../Common/DataHandler";
import { useEffect } from "react";
import TextBar from "../Common/TextBar";
import { updateVVDInfo } from "../Common/DataHandler";

const getCurrentDate = (): string => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy}`;
};

var initialRecentFixes = "Add a note"
const CURRENT_DATE = getCurrentDate();

interface VersionDescriptionDocumentProps {
    loginStatus: boolean;
    closeFunc: any;
}

const VersionDescriptionDocument: React.FC<VersionDescriptionDocumentProps> = ({ loginStatus, closeFunc }) => {
    
    const [currentNote, setCurrentNote] = useState<string>('');
    const [recentFixes, setRecentFixes] = useState<string[]>([]);
    const [buildUpdatedStatus, setbuildUpdatedStatus] = useState(<></>); 

    function handlenCurrentNote(event: any) {
        setCurrentNote(event.target.value);
    }

    function addToNotesArray() {
        // let tempArray = RecentFixes;
        // tempArray.push(currentNote)
        // setRecentFixes(tempArray)
        if (currentNote.length < 1) {
            setbuildUpdatedStatus(<Typography color="red">Please enter a note</Typography>);
            return
        } 
        setRecentFixes([...recentFixes, currentNote])
        setCurrentNote('')
    }

    const handleUpdateInfo = async (event: React.FormEvent) => {
        event.preventDefault();
        const success = await updateVVDInfo(CURRENT_DATE, recentFixes);
    
        if (success == 0) {
            console.log('Added successful');
            setbuildUpdatedStatus(<Typography color="green">Generated VVD!</Typography>);

        }
        else if (success == 1) {
            setbuildUpdatedStatus(<Typography color="red">Error fetching data</Typography>);
        }
    }

    return (
        <>
        <Typography variant="h6">Version Description Document (VVD)</Typography>
        <ElementBox closeFunc={closeFunc}>
            {/* <TextBar label="Version number: " currentValue={currentVersion}/> */}
            <TextBar label="Date: " currentValue={CURRENT_DATE}/>
            <TextBox label="Recent fixes: " type="text" placeholder={loginStatus? initialRecentFixes: ''} loginStatus={loginStatus} onChange={handlenCurrentNote} currentValue={currentNote}/>
            <ButtonHandler buttonName="Add note" loginStatus={loginStatus} buttonFunc={addToNotesArray}/>
            <ButtonHandler buttonName="Generate" loginStatus={loginStatus} buttonFunc={handleUpdateInfo}/>
            {buildUpdatedStatus}
        </ElementBox>
        </>
    )
};

export default VersionDescriptionDocument
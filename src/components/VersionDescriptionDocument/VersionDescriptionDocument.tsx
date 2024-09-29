import { useState } from "react";
import TextBox from "../Common/TextBox";
import TextBar from "../Common/TextBar";
import { Typography } from "@mui/material";
import ElementBox from "../Common/ElementBox";
import ButtonHandler from "../Common/ButtonHandler";
import { updateVVDInfo } from "../Common/DataHandler";

const getCurrentDate = (): string => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy}`;
};

const CURRENT_DATE = getCurrentDate();

interface VersionDescriptionDocumentProps {
    loginStatus: boolean;
    closeFunc: () => void;
}

const VersionDescriptionDocument: React.FC<VersionDescriptionDocumentProps> = ({ loginStatus, closeFunc }) => {
    
    const [currentNote, setCurrentNote] = useState<string>('');
    const [recentFixes, setRecentFixes] = useState<string[]>([]);
    const [buildUpdatedStatus, setbuildUpdatedStatus] = useState<string>(''); 

    function handlenCurrentNote(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentNote(event.target.value);
    }

    function addToNotesArray() {
        if (currentNote.length < 1) {
            setbuildUpdatedStatus('NoNote');
            return
        } 
        setRecentFixes([...recentFixes, currentNote])
        setCurrentNote('')
        setbuildUpdatedStatus('NoteAdded');
    }

    const handleUpdateInfo = async () => {
        const success = await updateVVDInfo(CURRENT_DATE, recentFixes);
        if (success) {
            setbuildUpdatedStatus('Success');
        }
        else {
            setbuildUpdatedStatus('ErrorInFetching');
        }
    }

    function updateOutputForUser() {
        if (buildUpdatedStatus == 'NoNote') {
            return (<Typography color="red">Please enter a note</Typography>);
        }
        else if (buildUpdatedStatus == 'Success') {
            return (<Typography color="green">Generated VVD!</Typography>);
        }
        else if (buildUpdatedStatus == 'ErrorInFetching') {
            return (<Typography color="red">Error fetching data</Typography>);
        }
        else if (buildUpdatedStatus == 'NoteAdded') {
            return (<Typography color="green">Note added</Typography>);
        }
    }

    return (
        <>
        <Typography variant="h6">Version Description Document (VVD)</Typography>
        <ElementBox closeFunc={closeFunc}>
            <TextBar label="Date: " currentValue={CURRENT_DATE}/>
            <TextBox label="Recent fixes: " type="text" placeholder={loginStatus? "Add a note": ''} loginStatus={loginStatus} onChange={handlenCurrentNote} currentValue={currentNote}/>
            <ButtonHandler buttonName="Add note" loginStatus={loginStatus} buttonFunc={addToNotesArray}/>
            <ButtonHandler buttonName="Generate" loginStatus={loginStatus} buttonFunc={handleUpdateInfo}/>
            {updateOutputForUser()}
        </ElementBox>
        </>
    )
};

export default VersionDescriptionDocument
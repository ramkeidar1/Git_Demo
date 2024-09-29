import { Typography, MenuItem, InputLabel, Select, FormControl, SelectChangeEvent } from "@mui/material";
import TextBox from "../Common/TextBox";
import ButtonHandler from "../Common/ButtonHandler";
import { branchHandler, addNewBranch, selectBranch } from "../Common/DataHandler";
import { useState } from "react";
import { useEffect } from "react";
import ElementBox from "../Common/ElementBox";

interface BranchHandlerProps {
    loginStatus: boolean; //The function that logs out of the application
    closeFunc: () => void; //The function that stops rendering the component
}


const BranchHandler: React.FC<BranchHandlerProps> = ({ loginStatus, closeFunc}) => {

    //Extracts the name of the selected brach from JSON and returns it
    const handleBranchSelect = async () => {
            const success = await branchHandler();
            return success[0]
        }

    const [currentBranch, setcurrentBranch] = useState<string>(''); //The name of the cuurent branch that is selected by the user
    const [branches, setBranches] = useState<string[]>([]);  //The list of branches that are extracted from the JSON server
    const [newBranchStatus, setnewBranchStatus] = useState<boolean>(false); //True if the user wants to add a new branch, and false otherwise
    const [newBranch, setnewBranch] = useState<string>(''); //The name of the new branch that the user would like to add and select
    const [branchAddedStatus, setbranchAddedStatus] = useState(<></>); //An HTML component that renders the status of the action that the user has done when necessary

    //Adds new branch to JSON and updates the 'branchAddedStatus' to be the result
    const handleAddBranch = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const success = await addNewBranch(newBranch);
    
        if (success == 0) {
            setbranchAddedStatus(<Typography color="green">Branch added and selected!</Typography>);


        } else if (success == 1) {
            setbranchAddedStatus(<Typography color="red">Branch already exists</Typography>);
        }
        else if (success == 2) {
            setbranchAddedStatus(<Typography color="red">Error fetching data</Typography>);
        }

        else if (success == 3) {
            setbranchAddedStatus(<Typography color="red">Enter a branch name</Typography>);
        }
    }
    //Selects new branch and updates the JSON and updates 'branchAddedStatus' to be the result
    const handleSelectBranch = async (event: React.FormEvent) => {
        event.preventDefault();
        const success = await selectBranch(currentBranch);
    
        if (success == 0) {
            setbranchAddedStatus(<Typography color="green">Branch selected!</Typography>);

        } else if (success == 2) {
            setbranchAddedStatus(<Typography color="red">Please select or add</Typography>);
        }
        else if (success == 1) {
            setbranchAddedStatus(<Typography color="red">Error fetching data</Typography>);
        }
    }

    //Handles the user inputs when entres a new branch
    function handleChangeBranch(event: SelectChangeEvent) {
        setcurrentBranch(event.target.value);
    }

    //Rendering the option for the user to add a new branch
    function addNewBranchOption() {
        setbranchAddedStatus(<></>)
        setnewBranchStatus(true)
    }

    //Handles the user select when selecting a new branch
    function handleNewBranch(event: React.ChangeEvent<HTMLInputElement>) {
        setnewBranch(event.target.value);
    }


    //Fetches the list of branches from the JSON to render to the user
    useEffect(() => {
        const fetchBranches = async () => {
            const fetchedBranches = await handleBranchSelect();  
            setBranches(fetchedBranches);
        };
        fetchBranches();
    }, []);

    const mappedBranchLists = branches.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>)

    return (
    <>
    <Typography variant="h6">Branch Handler</Typography>
    <ElementBox closeFunc={closeFunc}>
        <InputLabel>Selected branch: </InputLabel>
        <FormControl sx={{ width: 200 }}  disabled={!loginStatus}>
        <InputLabel>{loginStatus? 'Please select branch': null}</InputLabel>  {/* Change the label color here */}
        <Select onChange={handleChangeBranch} value={currentBranch} label="Normal select">
            {mappedBranchLists}
        </Select>
        </FormControl>
        <ButtonHandler buttonName="Select" buttonFunc={handleSelectBranch} loginStatus={loginStatus}/>
        {
            (newBranchStatus)? 
            <>
            <TextBox label="" type="text" placeholder="" onChange={handleNewBranch} currentValue={newBranch} loginStatus={loginStatus}/>  
            <ButtonHandler buttonName="Add" buttonFunc={handleAddBranch} loginStatus={loginStatus}/>
            </>
            : <ButtonHandler buttonName="add new branch" buttonFunc={addNewBranchOption} loginStatus={loginStatus}/>
        }
        {branchAddedStatus}
    </ElementBox>
    </>
    )
};

export default BranchHandler
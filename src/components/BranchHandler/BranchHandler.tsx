import { Box, Typography, MenuItem, InputLabel, Select, FormControl } from "@mui/material";
import TextBox from "../Common/TextBox";
import ButtonHandler from "../Common/ButtonHandler";
import { branchHandler, addNewBranch, selectBranch } from "../Common/DataHandler";
import { useState } from "react";
import { useEffect } from "react";
import ElementBox from "../Common/ElementBox";
import TextBar from "../Common/TextBar";

interface BranchHandlerProps {
    loginStatus: boolean;
    closeFunc: any;
}


const BranchHandler: React.FC<BranchHandlerProps> = ({ loginStatus, closeFunc}) => {

    const handleBranchSelect = async () => {
            const success = await branchHandler();
            return success[0]
        }

    const [currentBranch, setcurrentBranch] = useState<string>('');
    const [branches, setBranches] = useState<string[]>([]);  
    const [newBranchStatus, setnewBranchStatus] = useState<boolean>(false);
    const [newBranch, setnewBranch] = useState<string>('');
    const [branchAddedStatus, setbranchAddedStatus] = useState(<></>); 

    const handleAddBranch = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const success = await addNewBranch(newBranch);
    
        if (success == 0) {
            console.log('Added successful');
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

    const handleSelectBranch = async (event: React.FormEvent) => {
        event.preventDefault();
        const success = await selectBranch(currentBranch);
    
        if (success == 0) {
            console.log('Added successful');
            setbranchAddedStatus(<Typography color="green">Branch selected!</Typography>);

        } else if (success == 2) {
            setbranchAddedStatus(<Typography color="red">Please select or add</Typography>);
        }
        else if (success == 1) {
            setbranchAddedStatus(<Typography color="red">Error fetching data</Typography>);
        }
    }

    function handleChangeBranch(event: any) {
        setcurrentBranch(event.target.value);
    }

    function addNewBranchOption() {
        setbranchAddedStatus(<></>)
        setnewBranchStatus(true)
    }

    function handleNewBranch(event: any) {
        setnewBranch(event.target.value);
    }


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
        {/* <TextBar /> */}
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
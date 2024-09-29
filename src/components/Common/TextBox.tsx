import { Input, InputLabel } from "@mui/material";
// The Text Bar componenet which is used in the Project. Used to display data for the user

// The Text Bar componenet which is used in the Project. 
// Used to enable user to enter data

interface TextBoxProps {
    label: string; //The declaration of which data  to the user
    type: string; //The declaration of which data type is displayed
    placeholder: string; //The initial data that is displayed before the user entres his own data
    onChange: any; //The func that saves the data in a state that would be used later
    currentValue: string; //The current data that the user has entred
    loginStatus: boolean; //The inout should only be aviable when a user is logged in, and disable if not
}

const TextBox: React.FC<TextBoxProps> = ({label, type, placeholder, onChange, currentValue, loginStatus}) => {

    return (
    <>
        <InputLabel>
            {label}
        </InputLabel>
        <Input type={type} placeholder={placeholder} onChange={onChange} value={currentValue} disabled={!loginStatus}/>
    </>
    )
};

export default TextBox;
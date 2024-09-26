import { Input, InputLabel } from "@mui/material";
// import { useState } from 'react';

interface TextBoxProps {
    label: string;
    type: any;
    placeholder: string;
    onChange: any;
    currentValue: string;
    loginStatus: boolean;
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
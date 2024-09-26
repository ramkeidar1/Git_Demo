import { Typography } from "@mui/material";
import React from "react";
import TextBox from "../Common/TextBox";
import Model from "./Model";
import { DesktopModelContainer } from "./ModelPopupStyle";
import ButtonHandler from "../Common/ButtonHandler";
import { useState } from "react";
import { loginHandler } from "../Common/DataHandler";



interface BaseModelWrapperProps {
    isModalVisibile: boolean;
    onBackdropClick: () => void;
    setAuthenticationStatus: any;
    setActiveUrl: any;
    setActiveUser: any;

}

const BaseModelWrapper: React.FC<BaseModelWrapperProps> = ({ onBackdropClick, isModalVisibile, setAuthenticationStatus, setActiveUrl, setActiveUser }) => {
    if (!isModalVisibile) {
        return null
    }

    const [currentValueUsername, setCurrentValueUsername] = useState<string>('');
    const [currentValuePassword, setCurrentValuePassword] = useState<string>('');

    const [loginStatus, setLoginStatus] = useState(<></>); // Update login status state

    function handleChangeUsername(event: any) {
        setCurrentValueUsername(event.target.value);
    }

    function handleChangePassword(event: any) {
        setCurrentValuePassword(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        // Call the loginHandler function to check the credentials
        const success = await loginHandler(currentValueUsername, currentValuePassword);
    
        if (success[0] == 0) {
            console.log('Login successful');
            setAuthenticationStatus(true);
            onBackdropClick();
            setActiveUser(currentValueUsername)
            setActiveUrl(success[1])

        } else if (success[0] == 1) {
            console.log('Username is incorrect');
            setLoginStatus(<Typography color="red">Username not found</Typography>)
        }
        else if (success[0] == 2) {
            console.log('Password is incorrect');
            setLoginStatus(<Typography color="red">Password is incorrect</Typography>)
        }
        else if (success[0] == 3) {
            console.log('Error fetching data');
            setLoginStatus(<Typography color="red">Error fetching data</Typography>)
        }
        };
    return (<Model onBackdropClick={onBackdropClick}>
        <DesktopModelContainer>
            <Typography>Please Enter your Username & Password:</Typography>
            <TextBox label="Username: " type="text" placeholder="" onChange={handleChangeUsername} currentValue={currentValueUsername} loginStatus={true}/>
            <TextBox label="Password: " type="password" placeholder="" onChange={handleChangePassword} currentValue={currentValuePassword} loginStatus={true}/>
            <ButtonHandler buttonName="login" buttonFunc={handleSubmit} loginStatus={true}/>
            {loginStatus}
        </DesktopModelContainer>
    </Model>);
}

export default BaseModelWrapper
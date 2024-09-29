import { Typography } from "@mui/material";
import React from "react";
import TextBox from "../Common/TextBox";
import Model from "./Model";
import { DesktopModelContainer } from "./ModelPopupStyle";
import ButtonHandler from "../Common/ButtonHandler";
import { useState } from "react";
import { loginHandler } from "../Common/DataHandler";



interface BaseModelWrapperProps {
    isModalVisibile: boolean; //Returns true if the login pop up is 
    onBackdropClick: () => void; //Closed the pop up
    setAuthenticationStatus: (arg1: boolean) => void; //Updates the autentincation status
    setActiveUrl: (arg1: string) => void; //Updates the active user's name
    setActiveUser: (arg1: string) => void; //Updates the active user's URL

}

const BaseModelWrapper: React.FC<BaseModelWrapperProps> = ({ onBackdropClick, isModalVisibile, setAuthenticationStatus, setActiveUrl, setActiveUser }) => {
    if (!isModalVisibile) {
        return null
    }

    const [currentValueUsername, setCurrentValueUsername] = useState<string>(''); //The data that is displayed to the user in 'name'
    const [currentValuePassword, setCurrentValuePassword] = useState<string>(''); //The data that is displayed to the user in 'URL'
    const [loginStatus, setLoginStatus] = useState(<></>); //An HTML component that renders the status of the action that the user has done when necessary

    //Handles the user inputs when entering a new username
    function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentValueUsername(event.target.value);
    }

    //Handles the user inputs when entering a new password
    function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentValuePassword(event.target.value);
    }

    //Checks against the JSON if the username and password match and exists, and updates the 'loginStatus'
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const success = await loginHandler(currentValueUsername, currentValuePassword);
    
        if (success[0] == 0) {
            setAuthenticationStatus(true);
            onBackdropClick();
            setActiveUser(currentValueUsername)
            setActiveUrl(success[1])

        } else if (success[0] == 1) {
            setLoginStatus(<Typography color="red">Username not found</Typography>)
        }
        else if (success[0] == 2) {
            setLoginStatus(<Typography color="red">Password is incorrect</Typography>)
        }
        else if (success[0] == 3) {
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
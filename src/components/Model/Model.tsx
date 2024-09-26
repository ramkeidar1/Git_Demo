import React from "react";
import ReactDOM from 'react-dom';
import { Box, Button } from "@mui/material";
// import styled from "styled-components";
import { Overlay } from "./ModelPopupStyle";

interface ModalProps {
    onBackdropClick: () => void;
    children: React.ReactNode;
}


const Model: React.FC<ModalProps> = ({ onBackdropClick, children}) => {
    return ReactDOM.createPortal(
    <Overlay onClick={onBackdropClick}>
        <Box onClick={ e => e.stopPropagation() }>
            <Button onClick={onBackdropClick} variant="outlined" sx={{background: 'white', color: 'black', borderColor: 'black', mx: '1'}}>
                &times;
            </Button>
            {children}
        </Box>
    </Overlay>
    , document.getElementById('model-root')!);
}

export default Model
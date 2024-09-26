// import styled from "styled-components";
import { styled } from "@mui/material"
import Model from "./Model";

const ModelContainer = styled('div')`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative
`;

export const DesktopModelContainer = styled(ModelContainer)`
    border-radius: 7px;
    box-shadow: 0 0 32px rgba(0,0,0,0.5);
    padding: 40px;
    width: 450px;
    font-size: 26px
`;

export const Typography = styled('h3')`
    color: black;
    font-size: 35px;
    line-height: 1em;
    font-weight: 300;
    margin: 5px 0 10px;
    text-align: center;
`;


export const Overlay = styled('div')`
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;


import { Box, Chip } from "@mui/material";

// The Element componenet which is used in the Project

interface ElementBoxProps {
    children: React.ReactNode; //The children which the Element should render
    closeFunc: any; //The func that closed the Chip of the ElementBox
}

const ElementBox: React.FC<ElementBoxProps> = ({children, closeFunc}) => {
    return (
    <>
        <Chip variant="filled" color="warning" onDelete={closeFunc} sx={{top:48, right:15}} />
        <Box component="section" sx={{
            my: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            p: 2,
            border: '2px solid grey',
            borderRadius: '16px',
            background: 'aliceblue'
        }}>
            {children}
        </Box>
    </>
    )
};

export default ElementBox;
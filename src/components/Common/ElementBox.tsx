import { Box, Chip } from "@mui/material";

interface ElementBoxProps {
    children: any;
    closeFunc: any;
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
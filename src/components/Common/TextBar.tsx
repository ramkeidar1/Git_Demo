import { Typography } from "@mui/material";

// The Text Bar componenet which is used in the Project. 
// Used to display data for the user


interface TextBarProps {
    label: string; //The declaration of which data is displayed to the user
    currentValue: string; //The data that is displayed
}

const TextBar: React.FC<TextBarProps> = ({label, currentValue}) => {
    return (
    <>
        <Typography variant="body1" color="rgba(0, 0, 0, 0.6)">
            {label}
        </Typography>
        <Typography variant="body2" color="rgba(0, 0, 0, 0.8)">
            {currentValue}
        </Typography>
    </>
    )
};

export default TextBar;
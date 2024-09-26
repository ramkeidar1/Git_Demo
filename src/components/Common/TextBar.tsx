import { Typography } from "@mui/material";

interface TextBarProps {
    label: string;
    currentValue: string;
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
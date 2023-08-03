import { FormControlLabel, TextField } from "@mui/material";

interface LabeledInputProps {
    label: string;
    placeholder: string;
    type?: string;
    initialValue?: string;
    width?: string;
    required?: boolean;
    readonly?: boolean;
    onChange: (e: any) => void;
}

export const LabeledInput = ({
    label,
    placeholder,
    required = false,
    type = "text",
    width = "100%",
    readonly = false,
    initialValue = undefined,
    onChange
}: LabeledInputProps) => {
    return (
        <FormControlLabel
            control={
                <TextField
                    type={type}
                    variant="outlined"
                    size="small"
                    className="mt-2"
                    placeholder={placeholder}
                    fullWidth
                    value={initialValue}
                    InputProps={{
                        readOnly: readonly
                    }}
                    required={required}
                    onChange={onChange}
                />
            }
            label={label}
            labelPlacement="top"
            sx={{
                ".MuiFormControlLabel-label": {
                    textAlign: "left",
                    width: "100%",
                    fontWeight: "600"
                },
                ".MuiFormControlLabel-asterisk": {
                    display: "none"
                },
                margin: "0 !important",
                width: width
            }}
        />
    );
};

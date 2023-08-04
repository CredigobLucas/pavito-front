import React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import JSX from "next";
import { FormControlLabel, TextField, Typography } from "@mui/material";

type State = {
    showPassword: boolean;
};

type PasswordProps = {
    label?: string;
    placeholder: string;
    modifyPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Password(props: PasswordProps): JSX.Element {
    const [values, setValues] = React.useState<State>({
        showPassword: false,
    });
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClickShowPassword = (): void => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });

        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ): void => {
        event.preventDefault();
    };

    return (
        <FormControlLabel
            control={
                <TextField
                    label={props.label ? "" :  props.placeholder}
                    placeholder={props.label ? props.placeholder : ""}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="password"
                    type={values.showPassword ? 'text' : 'password'}
                    required={true}
                    onChange={props.modifyPassword}
                    inputRef={inputRef}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />
            }
            label={props.label}
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
                width: "100%"
            }}
        />
    );
}
/* eslint-disable @next/next/no-img-element */
"use client";
import "index.css";
import { Modal, Box } from "@mui/material";

interface LoaderProps {
    open: boolean;
}

export const Loader = ({ open }: LoaderProps): JSX.Element => {
    return (
        <Modal open={open}>
            <Box
                sx={{
                    width: "200px",
                    height: "200px",
                    position: "absolute",
                    top: "calc(50% - 100px)",
                    left: "calc(50% - 100px)"
                }}
                component="div"
            >
                <span className="loader"></span>
            </Box>
        </Modal>
    );
};

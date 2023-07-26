/* eslint-disable @next/next/no-img-element */
"use client";

import { Modal, Box, Paper } from "@mui/material";

interface LoaderProps {
    open: boolean;
}

export const Loader = ({ open }: LoaderProps) => {
    return (
        <Modal open={open}>
            <Box
                sx={{
                    width: "200px",
                    height: "200px",
                    position: "absolute" as "absolute",
                    top: "calc(50% - 100px)",
                    left: "calc(50% - 100px)"
                }}
                component="div"
            >
                <Paper>
                    <img
                        style={{
                            width: "90%",
                            height: "90%"
                        }}
                        src="https://i.gifer.com/6oa.gif"
                        alt="loader"
                    />
                </Paper>
            </Box>
        </Modal>
    );
};

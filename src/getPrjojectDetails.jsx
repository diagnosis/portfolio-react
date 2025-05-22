import {useState} from "react";
import {Modal} from "../Modal.jsx";


const getProjectDetails = ({projectDetail}) => {

        return (
            <>
                <Modal>
                    <h1>Project Details</h1>
                    <p>{projectDetail.description}</p>
                </Modal>
            </>
        )
    }
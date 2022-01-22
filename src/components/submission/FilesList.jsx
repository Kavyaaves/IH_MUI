import { Delete } from '@mui/icons-material';
import { Button, Dialog, IconButton, Paper, Stack } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { arrayUnion, collection, doc, onSnapshot, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db, storage } from '../../database';
import TableCustom from "../common/TableCustom"
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { v4 as uuidv4 } from "uuid"
import DeleteSureModal from '../common/DeleteSureModal';
import NewTab from "./NewTab"
import MoveFilesModals from "./modals/MoveFilesModals"

const FilesList = ({ tab, postId, id, file, selected, setSelected }) => {
    const classes = useStyles()
    const [deleteFileModal, setDeleteFileModal] = useState(false)
    const [moveFileModal, setMoveFileModal] = useState(false)
    const [newTabModal, setNewTabModal] = useState(false)
    const handleClose = () => {
        setSelected([])
        setDeleteFileModal(false)
    }
    const handleMoveClose = () => {
        setSelected([])
        setMoveFileModal(false)
    }
    const deleteSelected = async () => {
        if (selected?.length > 0) {
            const refFire = doc(db, "posts", postId, "files", id)
            selected.forEach((fil) => {
                deleteObject(ref(storage, "files/" + postId + "/" + file.name + "_" + file.id)).then(() => {
                    setDoc(refFire, {
                        [tab]: file?.filter(f => f.id != fil.id)
                    }, { merge: true }).then(() => {
                        setDeleteFileModal(false)
                    })
                })
            })
        }
    }
    const columns = [
        {
            id: 'id',
            // numeric: true,
            disablePadding: false,
            label: 'File Name',
            render: (row) => < >{row?.name}</>
        },
        {
            id: 'id',
            // numeric: true,
            disablePadding: false,
            label: 'View',
            render: (row) => < >
                <a href={row?.url} target="_blank">
                    View
                </a>
            </>
        },
        {
            id: 'id',
            // numeric: true,
            disablePadding: false,
            label: 'Download',
            render: (row) => <>
                <a href={row?.url} download={row?.name} >
                    Download
                </a>
            </>
        },
        {
            id: 'id',
            // numeric: true,
            disablePadding: false,
            label: 'Actions',
            render: (row) =>
                <>
                    <IconButton
                        color="primary"
                        onClick={(e) => {
                            e.preventDefault();
                            setSelected([row])
                            setDeleteFileModal(true)
                        }}>
                        <Delete />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={(e) => {
                            e.preventDefault();
                            setSelected([row])
                            setMoveFileModal(true)
                        }}>
                        <DriveFileMoveIcon />
                    </IconButton>

                </>
        },
    ];
    const handleFileChange = async (e) => {
        const files = [];
        for (let i = 0; i < e.target.files?.length; i++) {
            files.push(e.target.files[i])
        }
        if (files?.length > 0)
            try {
                files?.map((file) => {
                    const uu = uuidv4()
                    const storageRef = ref(storage, `files/${postId}/${file.name}_${uu}`)
                    uploadBytes(storageRef, file).then(async (snapshot) => {
                        const refFire = doc(db, "posts", postId, "files", id)
                        getDownloadURL(storageRef)
                            .then((url) => {
                                setDoc(refFire, {
                                    [tab]: arrayUnion({
                                        name: file.name,
                                        url, id: uu, size: file.size,
                                        lastModifiedDate: file.lastModifiedDate,
                                        type: file.type
                                    })
                                }, { merge: true }).catch((err) => console.log(err))
                            })
                            .catch((err) => {
                                console.log(err)
                            });
                    });
                })
            } catch (err) {
                console.log(err)
            }
    }
    console.log(selected)
    return (
        <div>
            <Stack alignItems="center" width="100%" mb={1} direction="row" spacing={2} justifyContent="right">
                {selected?.length > 1 &&
                    <Button variant="contained" component="span" onClick={() => setMoveFileModal(true)}>
                        Move {selected?.length} files
                    </Button>
                }
                {selected?.length > 1 &&
                    <Button variant="contained" component="span" onClick={() => setDeleteFileModal(true)}>
                        Delete {selected?.length} files
                    </Button>
                }
                <label htmlFor="contained-button-file">
                    <Input id="contained-button-file" multiple type="file" onChange={handleFileChange} className={classes.input} />
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                </label>
                <Button variant="contained" component="span" onClick={() => setNewTabModal(true)}>
                    New Tab
                </Button>
            </Stack>
            {file?.length > 0 && <TableCustom
                headCells={columns}
                rows={file}
                tab={tab}
                selected={selected}
                setSelected={setSelected}
            />}
            {deleteFileModal &&
                <DeleteSureModal
                    title="Delete File(s)"
                    msg={`Are you sure you want to delete ${selected?.length > 1 ? selected?.length + " files" : "1 file"}?`}
                    isVisible={deleteFileModal}
                    onClose={handleClose}
                    onConfirmation={deleteSelected}
                />
            }
            {moveFileModal &&
                <MoveFilesModals
                    postId={postId}
                    title="Move File(s)"
                    files={file}
                    id={id}
                    currTab={tab}
                    selected={selected}
                    msg={`Are you sure you want to move ${selected?.length > 1 ? selected?.length + " files " : "1 file "} from ${tab}?`}
                    isVisible={moveFileModal}
                    onClose={handleMoveClose}
                    onConfirmation={deleteSelected}
                />
            }
            <NewTab
                id={id}
                isVisible={newTabModal}
                handleClose={() => setNewTabModal(false)}
                postId={postId}
            />
        </div >
    )
}
const Input = styled('input')({
    display: 'none',
});

const useStyles = makeStyles((theme) => ({
    uploadButton: {
        float: "right",
        marginRight: 25
    },
    paper: {
    },
    input: {
        display: "none"
    }
}))

export default FilesList

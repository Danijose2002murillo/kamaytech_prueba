/*
 * POST
 *
 */

import React, { useEffect, useState } from "react";

//components
import { Button, Modal, Spinner } from "react-bootstrap";

// services
import { postAPI, putAPI } from "../../services/service";

// interfaces
import { Notification, PostPayload } from '../../Interface/index';

// props
type IProps = {
  setNotification: (msg: Notification) => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  editObj: PostPayload;
  setPostList: (arr: string[]) => void;
  setEditObj: (post: PostPayload) => void;
  postList: string[];
};

const Post: React.FC<IProps> = (props) => {
  const { setIsOpen, isOpen, editObj, setNotification, setPostList, postList, setEditObj } =
    props;

  const [value, setValue] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (editObj.title) {
      setValue(editObj.title);
    }
  }, [editObj.title])

  // CLOSE modal
  const handleClose = () => {
    setIsOpen(false);
    setValue("");
    setEditObj({userId: 0, title: "", body: "", id: "", comment: ""});
  };

  const putRequest = async () => {
    const newObj = { ...editObj, title: value };
    try {
      // ADD NEW POST
      const postRes = await putAPI(newObj);
      if (postRes.data) {
        const finIndex = postList.findIndex(
          (item: any) => item.id === postRes.data.id
        );
        postList[finIndex] = postRes.data;
        const updatedList = [...postList];
        setPostList(updatedList);
        setNotification({
          msg: "Creacion Correcta",
          color: "success",
        });
      }
    } catch (error) {
      setNotification({ msg: "Algo salió mal", color: "danger" });
    }
  }

  const postRequest = async () => {
    try {
      const post = {
        title: value,
        body: "",
        userId: 1
      } as PostPayload;
      // EDIT POST POST
      const postRes = await postAPI(post);
      if (postRes.data) {
        postList.splice(0, 0, postRes.data);
        const updatedList = [...postList];
        setPostList(updatedList);
        setNotification({ msg: "Edicion exitosa", color: "success" });
      }
    } catch (error) {
      setNotification({ msg: "Algo salio mal", color: "danger" });
    }
  }

  const onSubmit = async () => {
    setLoader(true);
    if (editObj.title) {
      await putRequest();
    } else {
      await postRequest();
    }
    setLoader(false);
    handleClose();
  };

  return (
    <>
      <Modal show={isOpen} animation={true}>
        <Modal.Header className="modal-header">
          <Modal.Title className="mx-auto">{editObj.title ? "Editar" : "Agregar nueva publicacion"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>nueva publicacion</label>
            <div className="input-group mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                name="name"
                data-testid="title-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ingresar publicacion"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loader} variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button data-testId="add-button" className="add-btn" disabled={loader} variant="primary" onClick={onSubmit}>
            {loader ? <Spinner color="primary" size="sm" /> : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;

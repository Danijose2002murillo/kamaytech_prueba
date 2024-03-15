


import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

// componentes
//import { EditIcon, DeleteIcon } from "./Icons";

// servicios
import { getPostsAPI, deletePostAPI } from "../../services/service";

// interfaces
import { PostPayload, Notification } from '../../Interface/index';
import { DeleteIcon, EditIcon } from "./Icons";

// propiedades
type IProps = {
  setNotification: (msg: Notification) => void;
  setIsOpen: (isOpen: boolean) => void;
  setEditObj: (post: PostPayload) => void;
  setPostList: (arr: string[]) => void;
  postList: string[];
};

const PostList: React.FC<IProps> = (props) => {
  const { setIsOpen, setEditObj, setNotification, postList, setPostList } =
    props;
  const [loader, setLoader] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    getData();
  }, []);

  // Add new post
  const openModal = () => {
    setIsOpen(true);
  };

  // EDIT POST
  const editPost = (id: number) => {
    openModal();
    const filter = postList.filter((item: any) => item.id === id)[0] as any;
    setEditObj(filter);
  };

  // Delete POST
  const deletePost = async (id: number) => {
    setLoader(true);
    setEditId(id);
    try {
      const response = await deletePostAPI(id);
      if (response.data) {
        const filter = postList.filter((item: any) => item.id !== id);
        setPostList([...filter]);
        setNotification({
          msg: "Publicacion Eliminada.",
          color: "success",
        });
      }
    } catch (error) {
      setNotification({ msg: "Algo salió mal", color: "danger" });
    }
    setEditId(0);
    setLoader(false);
  };

  // GET POSTS list
  const getData = async () => {
    try {
      const response = await getPostsAPI();
      setPostList(response.data);
    } catch (error) {
      setNotification({ msg: "Algo salió mal", color: "danger" });
    }
  };

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-end">
        <Button className="add-btn" onClick={() => openModal()}>
          Agregar nueva publicacion
        </Button>
      </div>
      <div className="main mt-3 table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="column1">Usuario</th>
              <th scope="column2">Publicacion</th>
              <th scope="column3">Comentario</th>
              <th scope="col">modificar/eliminar</th>
            </tr>
          </thead>
          <tbody>
            {postList.slice(0, 10).map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  {item.body}
                </td>
                <td>
                  {item.title}
                </td>
                <td>
                  <span className="pointer" onClick={() => editPost(item.id)}>
                    <EditIcon />
                  </span>
                  <span className="pointer ms-3" onClick={() => deletePost(item.id)}>
                    {((editId === item.id) && loader) ? <Spinner color="danger" size="sm" /> : <DeleteIcon />}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostList;

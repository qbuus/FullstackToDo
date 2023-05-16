import { ToDoBody } from "../models/ToDo";
import { useEffect, useState, Fragment } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as ToDoApi from "../api/appApi";
import "../styles/utils.css";
import { MdDelete } from "react-icons/md";
import dateFormat from "../utils/dateFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  ToDos,
  RootState,
  EditToDo,
} from "../redux/reduxState";
import toast from "react-hot-toast";

export default function AuthMainPage() {
  const dispatch = useDispatch();
  const ToDoSelector = useSelector(
    (state: RootState) => state.ToDoList
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function loadToDo() {
      try {
        setLoading(true);
        setError(false);
        const response = await ToDoApi.fetchToDos();
        dispatch(ToDos(response));
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadToDo();
  }, [dispatch]);

  async function deleteNote(todo: ToDoBody) {
    try {
      await ToDoApi.deleteToDo(todo._id);
      const filterOfTodo = ToDoSelector.filter(
        (existingToDo) => existingToDo._id !== todo._id
      );
      toast.success("To do has been successfully deleted");
      dispatch(ToDos(filterOfTodo));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const ToDoGrid = () => {
    return (
      <>
        <Link to="/add">
          <Button
            variant="dark"
            as="button"
            className="flexCenter mb-4 mt-4 blockCenter"
          >
            <div className="d-flex px-3 text-white px-1 fs-4">
              Add task
            </div>
          </Button>
        </Link>
        <Row xs={1} md={2} xl={3} className={"g-4 toDoGrid"}>
          {ToDoSelector.map((todo) => (
            <Col key={todo._id}>
              <Card className={"toDoCard toDo"}>
                <Card.Body className="cardBody">
                  <Card.Title className="flexCenter text-white">
                    {todo.title}
                    <MdDelete
                      className="ms-auto icon"
                      onClick={(e) => {
                        deleteNote(todo);
                        e.stopPropagation();
                      }}
                      size={25}
                    />
                  </Card.Title>
                  <Card.Text className="cardText text-white">
                    {todo.text}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-white d-flex justify-content-between align-items-center">
                  <div>
                    {todo.updatedAt > todo.createdAt
                      ? dateFormat(todo.updatedAt)
                      : dateFormat(todo.createdAt)}
                  </div>
                  <Link to={`/edit/${todo._id}`}>
                    <Button
                      as="button"
                      variant="light"
                      className="edit px-2 py-1"
                      onClick={() => dispatch(EditToDo(todo))}
                    >
                      Edit
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  };

  const NoToDo = () => {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center gap-4">
        <div>
          <Row>
            <Col>
              <div className="d-flex px-5 text-black px-5 py-3 fs-3">
                You dont have any to do's
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col>
              <Button variant="dark" as="button">
                <Link to="/add">
                  <div className="d-flex px-3 text-white px-2 fs-3">
                    Add task
                  </div>
                </Link>
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading && (
        <div className="vh-100">
          <Spinner
            animation="border"
            variant="dark"
            className="blockCenter flexCenter mt-3 "
          />
        </div>
      )}
      {error && (
        <p className="fs-3 text-center mt-2 vh-100">
          Something went wrong. Refresh the page
        </p>
      )}
      {!error && !loading && (
        <Fragment>
          {ToDoSelector.length > 0 ? (
            <div className="vh-100">
              <ToDoGrid />
            </div>
          ) : (
            <NoToDo />
          )}
        </Fragment>
      )}
    </>
  );
}

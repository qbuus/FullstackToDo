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

export default function AuthMainPage() {
  const [toDos, setToDos] = useState<ToDoBody[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function loadToDo() {
      try {
        setLoading(true);
        setError(false);
        const response = await ToDoApi.fetchToDos();
        setToDos(response);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadToDo();
  }, []);

  async function deleteNote(todo: ToDoBody) {
    try {
      await ToDoApi.deleteToDo(todo._id);
      setToDos(
        toDos.filter(
          (existingToDo) => existingToDo._id !== todo._id
        )
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const ToDoGrid = () => {
    return (
      <Row xs={1} md={2} xl={3} className={"g-4 toDoGrid"}>
        {toDos.map((todo) => (
          <Col key={todo._id}>
            <Card className={"toDoCard toDo"}>
              <Card.Body className="styles.cardBody">
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
              <Card.Footer className="text-white">
                {dateFormat(todo.createdAt)}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
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
      <Button
        variant="dark"
        as="button"
        className="flexCenter mb-4 mt-4 blockCenter"
      >
        <Link to="/add">
          <div className="d-flex px-3 text-white px-1 fs-4">
            Add task
          </div>
        </Link>
      </Button>
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
        <p className="fs-3 text-center mt-2">
          Something went wrong. Refresh the page
        </p>
      )}
      {!error && !loading && (
        <Fragment>
          {toDos.length > 0 ? (
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

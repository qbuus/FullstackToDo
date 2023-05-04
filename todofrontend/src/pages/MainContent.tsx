import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  isAuth,
  authUser,
} from "../redux/reduxState";
import NotAuthMainPage from "../components/NotAuthMainPage";
import AuthMainPage from "../components/AuthMainPage";

export default function MainContent() {
  const isUserAuthorized = useSelector(
    (state: RootState) => state.isUserAuthenticated
  );
  const dispatch = useDispatch();

  return (
    <>
      {isUserAuthorized ? (
        <AuthMainPage />
      ) : (
        <NotAuthMainPage />
      )}
    </>
  );
}

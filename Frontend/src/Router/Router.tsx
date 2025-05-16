import { createBrowserRouter } from "react-router-dom";
import Quiz from "../Components/Quiz/Quiz";
import App from "../App";
import Finish from "../Components/Finish/Finish";
import Login from "../Components/Login/Login";
import AnswerReview from "../Components/AnswerReview/AnswerReview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: "quiz/:id", element: <Quiz /> },
      { path: "finish", element: <Finish />, children:[
        {path: "answerReview", element: <AnswerReview/>}
      ] },
    ],
  },
]);
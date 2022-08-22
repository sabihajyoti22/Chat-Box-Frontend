import { BrowserRouter as Router, Routes, Route} from "react-router-dom" 

import SignIn from "./Component/SignIn";
import ChatRoom from "./Component/ChatRoom";
import "./style.css"

function App() {
  return (
    <>
      {/* <SignIn /> */}
      <Router>
          <Routes>
            <Route index element={<SignIn />}/>
            <Route path="/chat/:roomId" element={<ChatRoom />}/>
            <Route path="*" element={<h1>Page Not Found!!!</h1>}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;

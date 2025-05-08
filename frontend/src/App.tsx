
import './App.css'


import HomePage from "./components/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import GoalForm from "./components/GoalForm.tsx";
import GoalPage from "./components/GoalPage.tsx";
import ViewProgress from "./components/ViewProgress.tsx"
import AIAssistantPage from "./components/AIAssistantPage.tsx";


function App() {


  return (
    <>

        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/newGoal" element={<GoalForm/>} />
            <Route path="/PreviousGoals" element={<GoalPage/>} />
            <Route path="/ViewProgress" element={<ViewProgress/>} />
            <Route path="/Assistant" element={<AIAssistantPage/>} />


        </Routes>
    </>
  )
}

export default App

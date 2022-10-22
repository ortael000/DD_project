import './Style/App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import {Layout} from "./pages/layout.js"
import {Homepage} from "./pages/homepage.js"
import {Bestiary} from "./pages/bestiary.js"
import {Object} from "./pages/object.js"
import {Fight} from "./pages/fight.js"
import {Character} from "./pages/character.js"
import {World} from "./pages/world.js"
import {Skill} from "./pages/skill.js"
import {Admin} from "./pages/admin.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />  {// definit l'element par "defaut"
          }
          <Route path="homepage" element={<Homepage />} />
          <Route path="bestiary" element={<Bestiary />} />
          <Route path="object" element={<Object />} />
          <Route path="fight" element={<Fight />} />
          <Route path="character" element={<Character />} />
          <Route path="world" element={<World />} />
          <Route path="skill" element={<Skill />} />
          <Route path="admin" element={<Admin />} />
          
        </Route>
      </Routes>
    </BrowserRouter>

    
  );
}

export default App;
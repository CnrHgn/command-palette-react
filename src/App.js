import React from 'react'
import CommandPalette from './components/CommandPalette';
import projects from "./projectsData";

function App() {

  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.pling.com/img/00/00/58/95/21/1546464/6775da853edf540d588e409a1c7b50e409a4c7df0abd45028fba8d020b4893cdbda1.png')`,
      }}
    >
      <CommandPalette projects={projects}/>
    </div>
  );
}

export default App;

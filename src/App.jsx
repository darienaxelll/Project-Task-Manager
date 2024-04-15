import { useState } from "react";

import NoProjectSelected from "./components/NoProjectSelected";
import ProjectForm from "./components/ProjectForm";
import Sidebar from "./components/Sidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  const startAddProjectHandler = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  const addProjectHandler = (projectData) => {
    const newProject = { ...projectData, id: Math.random() };

    setProjectsState((prevState) => {
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  console.log(projectsState);

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <ProjectForm onAdd={addProjectHandler} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={startAddProjectHandler} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onStartAddProject={startAddProjectHandler} />
      {content}
    </main>
  );
}

export default App;

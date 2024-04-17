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
    const projectId = Math.random();
    const newProject = { ...projectData, id: projectId };

    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <ProjectForm onAdd={addProjectHandler} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={startAddProjectHandler} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onStartAddProject={startAddProjectHandler} projects={projectsState.projects}/>
      {content}
    </main>
  );
}

export default App;

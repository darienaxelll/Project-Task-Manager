import { useState } from "react";

import NoProjectSelected from "./components/NoProjectSelected";
import ProjectForm from "./components/ProjectForm";
import SelectedProject from "./components/SelectedProject";
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

  const selectProjectHandler = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  const deleteHandler = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
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

  const cancelhandler = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject project={selectedProject} onDelete={deleteHandler} />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <ProjectForm onAdd={addProjectHandler} onCancel={cancelhandler} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={startAddProjectHandler} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onStartAddProject={startAddProjectHandler}
        projects={projectsState.projects}
        onSelectProject={selectProjectHandler}
      />
      {content}
    </main>
  );
}

export default App;

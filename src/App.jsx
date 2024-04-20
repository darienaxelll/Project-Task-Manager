import { useState } from "react";

import NoProjectSelected from "./components/NoProjectSelected";
import ProjectForm from "./components/ProjectForm";
import SelectedProject from "./components/SelectedProject";
import Sidebar from "./components/Sidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
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

  const addTaskHandler = (text) => {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  };

  const deleteTaskHandler = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
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
    <SelectedProject
      project={selectedProject}
      tasks={projectsState.tasks}
      onDelete={deleteHandler}
      onAddTask={addTaskHandler}
      onDeleteTask={deleteTaskHandler}
    />
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
        selectedProjecctId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;

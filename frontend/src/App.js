import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskEditModal from "./components/TaskEditModal";
import Task from "./components/Task";
import TabList from "./components/TabList";

axios.interceptors.response.use(function (response) {
  if (response.headers['content-type'] !== 'application/json') {
    alert('unsupport data format in server response')
    return Promise.reject(new Error('unsupport data format'));
  }
  return response;
});

const App = () => {
  const [isShowCompleted, setIsShowCompleted] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  const refreshList = () => {
    axios
      .get("/api/tasks/")
      .then((res) => setTaskList(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleSubmit = (item) => {
    const request = item.id
      ? axios.put(`/api/tasks/${item.id}/`, item)
      : axios.post("/api/tasks/", item);

    request
      .then((res) => {
        refreshList();
        setActiveTask(null);
      })
      .catch(console.error);
  };

  const handleDelete = (item) => {
    axios
      .delete(`/api/tasks/${item.id}/`)
      .then(refreshList)
      .catch(console.error);
  };

  const createTask = () => {
    setActiveTask({ title: "", description: "", completed: false });
  };

  const showedTasks = taskList.filter(
    (item) => item.completed === isShowCompleted
  );

  return (
    <main className="container">
      <h1 className="text text-uppercase text-center my-4">Taski</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button className="btn btn-primary" onClick={createTask}>
                Add task
              </button>
            </div>
            <TabList
              displayCompleted={setIsShowCompleted}
              isShowCompleted={isShowCompleted}
            />
            <ul className="list-group list-group-flush border-top-0">
              {showedTasks.map((task) => (
                <Task
                  key={task.id}
                  data={task}
                  handleEdit={setActiveTask}
                  handleDelete={handleDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      {activeTask && (
        <TaskEditModal
          taskData={activeTask}
          toggle={() => setActiveTask(null)}
          onSave={handleSubmit}
        />
      )}
    </main>
  );
};

export default App;

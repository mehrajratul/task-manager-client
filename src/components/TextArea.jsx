import { useEffect, useState } from "react";
import Tasks from "./Tasks";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";

const TextArea = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const getBearerToken = () => {
    const token = localStorage.getItem("access-token");
    return token ? `Bearer ${token} ` : "";
  };

  const handleRefetch = () => {
    fetch("https://task-manager-server-blue.vercel.app/tasks", {
      headers: {
        Authorization: getBearerToken(),
      },
    })
      .then((res) => res.json())
      .then((updatedTasks) => {
        setTasks(updatedTasks);
      });
  };

  const handleTask = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const task = form.task.value;

    const creationTime = new Date();

    const year = creationTime.getFullYear();
    const month = creationTime.getMonth() + 1; //+1 because months are satrt from 0
    const day = creationTime.getDate();

    const hours = creationTime.getHours();
    const minutes = creationTime.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";

    const formatedHours = hours % 12 || 12;

    if (user && user.email) {
      console.log(user);
      const newTaskObj = {
        task,
        email: user.email,
        user_name: user.displayName,
        date: `${day}-${month}-${year}`,
        time: `${formatedHours}:${minutes} ${amOrPm}`,
      };
      fetch("https://task-manager-server-blue.vercel.app/tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: getBearerToken(),
        },
        body: JSON.stringify(newTaskObj),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            handleRefetch();
            form.reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "New Task Added",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "You must login to add a new task",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#60A5FA",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  const handleDelete = (id) => {
    fetch(`https://task-manager-server-blue.vercel.app/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: getBearerToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          fetch("https://task-manager-server-blue.vercel.app/tasks", {
            headers: {
              Authorization: getBearerToken(),
            },
          })
            .then((res) => res.json())
            .then((data) => setTasks(data));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Task Deleted",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (user && user.email) {
          await new Promise((resolve) => setTimeout(resolve, 200));

          const response = await fetch(
            `https://task-manager-server-blue.vercel.app/tasks?email=${user.email}`,
            {
              headers: {
                Authorization: getBearerToken(),
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data, "data");
            setTasks(data);
          } else {
            setTasks([]);
          }
        }
      } catch (error) {
        console.error("error fetching tasks", error);
        setTasks([]);
      }
    };
    fetchTasks();
  }, [user]);

  return (
    <section className="text-center px-8 container mx-auto mt-6">
      <div className="">
        {user ? (
          <table className="table text-center">
            {/* head */}
            <thead className="">
              <tr className="">
                <th>#</th>
                <th>Task</th>
                <th>Time</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {tasks.map((task, index) => (
                <Tasks
                  key={task._id}
                  task={task}
                  index={index + 1}
                  handleDelete={() => handleDelete(task._id)}
                  handleRefetch={() => handleRefetch()}
                  getBearerToken={() => getBearerToken()}
                ></Tasks>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-3xl">
            <p>Please login to add a task</p>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <form onSubmit={handleTask} className="card-body">
          <div className="flex justify-center gap-4">
            <div className="form-control w-2/3">
              <input
                type="text"
                name="task"
                placeholder="add task"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <input type="submit" className="btn btn-primary" value="Add" />
            </div>
          </div>
        </form>
        <div className="flex justify-center gap-2">
          <p className="text-md text-blue-400 mt-1.5">
            <FaRegUser />
          </p>
          <p className="text-xl text-blue-400">
            {user ? user.displayName : "Guest"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TextArea;

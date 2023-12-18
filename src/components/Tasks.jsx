import { FaDeleteLeft } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import Swal from "sweetalert2";

const Tasks = ({
  task,
  index,
  handleDelete,
  handleRefetch,
  getBearerToken,
}) => {
  console.log(task);
  const handleUpdateTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const taskId = task._id;
    console.log("taskId", taskId);
    const job = form.updateTask.value;

    console.log(job._id, job.task);

    const updatedTask = { task: job };
    console.log("updated Task", updatedTask);

    fetch(`https://task-manager-server-blue.vercel.app/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: getBearerToken(),
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Task Updated",
            showConfirmButton: false,
            timer: 1000,
          });
          form.reset();
          closeModal();
          handleRefetch();
        }
      });
  };

  const openModal = (taskId) => {
    //e.preventDefault();
    const modalId = `my_modal_${taskId}`;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.showModal();
      const form = modal.querySelector("form");
      form.updateTask.value = task.task;
    }
  };

  const closeModal = () => {
    const modalId = `my_modal_${task._id}`;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.close();
    }
  };
  return (
    <>
      <dialog id={`my_modal_${task._id}`} className="modal">
        <div className="modal-box">
          <form onSubmit={handleUpdateTask}>
            <input
              type="text"
              name="updateTask"
              className="input input-bordered w-full"
            />
            <div className="flex justify-end gap-4">
              <input
                className="btn btn-sm btn-accent mt-4"
                value="Update"
                type="submit"
              />
              <button
                className="btn btn-sm btn-secondary mt-4"
                onClick={closeModal}
              >
                Cancle
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <tr className="text-center">
        <td>{index}</td>
        <td>{task.task}</td>
        <td>{task.time}</td>
        <td>{task.date}</td>
        <td>
          <button className="text-3xl" onClick={() => openModal(task._id)}>
            <MdModeEditOutline />
          </button>
        </td>
        <td>
          <button className="text-3xl" onClick={() => handleDelete(task._id)}>
            <FaDeleteLeft />
          </button>
        </td>
      </tr>
    </>
  );
};

export default Tasks;

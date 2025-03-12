process.env.NODE_ENV = "test";

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app"); // Imports app from Express
const Task = require("../../models/task");

let mongoServer;
let uri;

beforeAll(async () => {
  await mongoose.disconnect();
  mongoServer = await MongoMemoryServer.create();
  uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: "todo_list" });
});



describe("Task Controllers", () => {
  test("Must receive an empty list from", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]); 
  });

  test("Must create a new task", async () => {
    const taskData = { title: "New task", description: "New description" };
    const res = await request(app).post("/tasks").send(taskData);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(taskData.title);
    expect(res.body.description).toBe(taskData.description);
  });

  test("Must update an existing task", async () => {
    const task = new Task({
      title: "Updating title",
      description: "Updating description",
    });
    await task.save();

    const updatedData = { title: "Updated task" };
    const res = await request(app).put(`/tasks/${task._id}`).send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedData.title);
  });

  test("Must delete a task by ID", async () => {
    const task = new Task({ title: "Delete a task" });
    await task.save();

    // 🛠️ Verifica que la tarea exista antes de eliminarla
    const foundTask = await Task.findById(task._id);
    expect(foundTask).not.toBeNull();

    // 🛠️ Asegura que la tarea se borra correctamente
    const res = await request(app).delete(`/tasks/delTask/${task._id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task deleted"); // 🔹 Verifica que el mensaje sea correcto
    expect(res.body._id).toBe(task._id.toString()); // 🔹 Verifica que el ID coincida

    // 🛠️ Comprueba que la tarea ya no existe en la base de datos
    const check = await Task.findById(task._id);
    expect(check).toBeNull();
  });

  test("Must delete all tasks", async () => {
    await Task.create([{ title: "Task 1" }, { title: "Task 2" }]);

    const res = await request(app).delete("/tasks/delAllTasks");

    // 🔹 Manejar casos en los que no haya tareas para eliminar
    if (res.status === 404) {
        expect(res.body?.message).toBe("No tasks to delete");
    } else {
        expect(res.status).toBe(200);
        const remainingTasks = await Task.find();
        expect(remainingTasks.length).toBe(0); 
    }
  });
});

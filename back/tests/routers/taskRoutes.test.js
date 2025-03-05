const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Task = require("../../models/task");

let mongoServer;
let app; // Se definirá después de configurar la conexión

beforeAll(async () => {
  // Si hay una conexión activa (provista por config/db.js al requerir app.js), la desconectamos
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  // Iniciamos mongodb-memory-server y conectamos a él
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: "todo_list" });
  
  // Ahora importamos app.js, ya que la conexión está configurada con el URI correcto
  app = require("../../app");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Limpiar la colección de tareas antes de cada test
beforeEach(async () => {
  await Task.deleteMany({});
});

describe("Task Routes", () => {
  
  test("GET /tasks debe retornar un array vacío y status 200", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual([]);
  });

  test("POST /tasks debe crear una nueva tarea", async () => {
    const taskData = { title: "Nueva Tarea", description: "Descripción de la tarea" };
    const res = await request(app).post("/tasks").send(taskData);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(taskData.title);
    expect(res.body.description).toBe(taskData.description);
  });

  test("PUT /tasks/:id debe actualizar una tarea existente", async () => {
    const task = await Task.create({ title: "Título Viejo", description: "Descripción vieja" });
    const updatedData = { title: "Título Actualizado", description: "Descripción actualizada" };
    const res = await request(app).put(`/tasks/${task._id}`).send(updatedData);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedData.title);
  });

  test("DELETE /tasks/delTask/:id debe eliminar una tarea por ID", async () => {
    const task = await Task.create({ title: "Tarea a eliminar", description: "Se eliminará" });
    const res = await request(app).delete(`/tasks/delTask/${task._id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task deleted");
    expect(res.body._id).toBe(task._id.toString());

    const check = await Task.findById(task._id);
    expect(check).toBeNull();
  });

  test("DELETE /tasks/delAllTasks debe eliminar todas las tareas", async () => {
    await Task.create([{ title: "Tarea 1" }, { title: "Tarea 2" }]);
    const res = await request(app).delete("/tasks/delAllTasks");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("All tasks deleted");

    const remainingTasks = await Task.find();
    expect(remainingTasks.length).toBe(0);
  });

});

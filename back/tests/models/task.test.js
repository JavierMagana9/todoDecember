const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Task = require("../../models/task");

let mongoServer;

// 🔹 Configuración antes de ejecutar cualquier prueba
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

// 🔹 Limpieza de la base de datos antes de cada test
beforeEach(async () => {
    await Task.deleteMany();
});

// 🔹 Cierra la conexión después de todas las pruebas
afterAll(async () => {
    if (mongoServer) {
        await mongoose.connection.close();
        await mongoServer.stop();
    }
});

afterEach(async () => {
    await Task.deleteMany();
});

// 🔹 Test: Guardar una tarea correctamente
test("Must save correctly a task", async () => {
    const task = new Task({ title: "Test Task" });
    const savedTask = await task.save();

    expect(savedTask._id).toBeDefined();
    expect(savedTask.title).toBe("Test Task");
    expect(savedTask.done).toBe(false);
});

// 🔹 Test: No debe guardar una tarea sin título
test("Should not save a task without a title", async () => {
    const task = new Task({});
    await expect(task.save()).rejects.toThrow();
});

// 🔹 Test: Eliminar una tarea correctamente
test("Should delete a task", async () => {
    const task = new Task({ title: "Task to Delete" });
    await task.save();

    await Task.deleteOne({ title: "Task to Delete" });
    const deletedTask = await Task.findOne({ title: "Task to Delete" });

    expect(deletedTask).toBeNull();
});



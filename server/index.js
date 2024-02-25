import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connection from "./conn.js";
import Msg from "./Models/model.js";
import UserAccount from "./Models/RegisterModel.js";

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = Express();
app.use(Express.json());
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.emit("connected", "Connected to server");

  console.log(
    "User connected! Total connected clients: ",
    io.engine.clientsCount
  );
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("newMessage", async (msg) => {
    try {
      const newMsg = new Msg(msg);
      await newMsg.save();
      // Emit the new message to all connected clients except the sender
      socket.broadcast.emit("newMessage", newMsg);
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.get("/loadMsgs", async (req, res) => {
  try {
    console.log("Getting messages");
    const msgs = await Msg.find();
    res.json(msgs);
    // console.log(msgs);
  } catch (err) {
    res.status(500).send("Failed to retrieve messages due to " + err);
  }
});

app.post("/msg", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const msg = req.body.msg;
  const newMsg = new Msg({
    name,
    email,
    msg,
  });
  try {
    await newMsg.save();
    // Emit new message to all connected clients except the sender
    io.emit("newMessage", newMsg);
    res.send("Message sent successfully");
  } catch (err) {
    res.send("Failed to send message: " + err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserAccount.findOne({ email, password });

    if (user) {
      if (user.password === password) {
        console.log("User logged in successfully");
        res
          .status(200)
          .json({ message: "User logged in successfully", isValid: true });
      }
    } else {
      console.log("Invalid email or password");
      res
        .status(401)
        .json({ message: "Invalid email or password", isValid: false });
    }
  } catch (err) {
    console.error("Failed to login user:", err);
    res.status(500).json({ message: "Failed to login user", isValid: false });
  }
});

app.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const newUser = new UserAccount({
    name,
    email,
    password,
  });
  try {
    await newUser.save();
    console.log("User registered successfully");
    res
      .status(200)
      .send({ message: "User registered successfully", isValid: true });
  } catch (err) {
    res.send("Failed to register user: " + err);
  }
});

export default app;

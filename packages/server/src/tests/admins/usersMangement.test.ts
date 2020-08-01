import request from "supertest";
import bcrypt from "bcryptjs";
import app from "../../app";
import { loggedinToken, adminToken, tearup } from "../data/users";
import User from "../../models/User";

beforeAll(() => tearup(false));

const addUser = {
  name: "newUser",
  email: "newuser@dummymail.com",
  password: "newUser12",
  password2: "newUser12",
  active: true,
  rank: 2,
};

describe("GET /admins/usersManagement/", () => {
  it("should get unauthorized error(not loggedin)", async () => {
    await request(app).get("/admins/usersManagement/").expect(401);
  });

  it("should get unauthorized error(not admin)", async () => {
    await request(app)
      .get("/admins/usersManagement/")
      .set("Authorization", `Bearer ${loggedinToken}`)
      .expect(401);
  });

  it("should get all users", async () => {
    await request(app)
      .get("/admins/usersManagement/")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);
  });
});

describe("POST /admins/usersManagement/", () => {
  it("should add new user", async () => {
    await request(app)
      .post("/admins/usersManagement/")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(addUser)
      .expect(200);

    const user = await User.findOne({ email: addUser.email });
    const matchUser = { ...addUser };
    delete matchUser.password;
    delete matchUser.password2;
    expect(user).toMatchObject(matchUser);
  });
});

describe("PUT /admins/usersManagement/{id}", () => {
  it("should edit a user", async () => {
    const newData = { name: "Changed name", rank: 1, active: false };
    const userToEdit = await User.findOne({ email: addUser.email });
    const userID = userToEdit ? userToEdit._id : "";

    await request(app)
      .put(`/admins/usersManagement/${userID}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newData)
      .expect(200);

    const user = await User.findById(userID);
    expect(user).toMatchObject(newData);
  });
});

describe("POST /admins/usersManagement/changePass/{id}", () => {
  it("should change user password", async () => {
    const newPass = { password: "newPass13", password2: "newPass13" };
    const userToEdit = await User.findOne({ email: addUser.email });
    const userID = userToEdit ? userToEdit._id : "";

    await request(app)
      .post(`/admins/usersManagement/changePass/${userID}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newPass)
      .expect(200);

    const user = await User.findById(userID);
    const isMatch = await bcrypt.compare(
      newPass.password,
      user ? user.password : "",
    );

    expect(isMatch).toBe(true);
  });
});

describe("DELETE /admins/usersManagement/{id}", () => {
  it("should delete user", async () => {
    const userToEdit = await User.findOne({ email: addUser.email });
    const userID = userToEdit ? userToEdit._id : "";

    await request(app)
      .delete(`/admins/usersManagement/${userID}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    const user = await User.findById(userID);
    expect(user).toBeNull();
  });
});

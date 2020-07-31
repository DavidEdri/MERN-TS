import bcrypt from "bcryptjs";
import request from "supertest";
import app from "../../app";
import User from "../../models/User";
import { firstUser, loggedinToken, tearup } from "../data/users";

beforeAll(async () => {
  await tearup(true);
});

describe("GET /users/userActions/refreshJWT", () => {
  it("should get unauthorized error", async () => {
    await request(app).get("/users/userActions/refreshJWT").expect(401);
  });

  it("should get new jwt token", async () => {
    const response = await request(app)
      .get("/users/userActions/refreshJWT")
      .set("Authorization", `Bearer ${loggedinToken}`)
      .expect(200);

    expect(response.body).toMatchObject({
      success: true,
      token: expect.any(String),
    });
  });
});

describe("POST /users/userActions/editInfo", () => {
  it("should change user info", async () => {
    const newInfo = {
      name: "New",
      passwords: { password: "newNew12", password2: "newNew12" },
    };
    await request(app)
      .post("/users/userActions/editInfo")
      .set("Authorization", `Bearer ${loggedinToken}`)
      .send(newInfo)
      .expect(200);

    const user = await User.findById(firstUser._id);
    const isMatch = await bcrypt.compare(
      newInfo.passwords.password,
      user?.password || "notSamePass"
    );

    expect(isMatch).toBe(true);
    expect(user?.name).toBe(newInfo.name);
  });
});

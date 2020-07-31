import request from "supertest";
import app from "../../app";
import User from "../../models/User";
import { existingUser, firstUser, newUser, tearup } from "../data/users";

beforeAll(() => tearup(false));

describe("POST /guests/auth/register", () => {
  it("should register a user", async () => {
    await request(app).post("/guests/auth/register").send(newUser).expect(200);
  });

  it("should get email exists error", async () => {
    const response = await request(app)
      .post("/guests/auth/register")
      .send(existingUser)
      .expect(400);

    expect(response.body).toMatchObject({
      email: expect.any(String),
    });
  });
});

describe("POST /guests/auth/login", () => {
  it("should login user", async () => {
    await request(app)
      .post("/guests/auth/login")
      .send({ email: firstUser.email, password: firstUser.password })
      .expect(200);
  });

  it("should not login", async () => {
    await request(app)
      .post("/guests/auth/login")
      .send({ email: firstUser.email, password: "failedPass" })
      .expect(400);
  });
});

describe("POST /guests/auth/activate/:token", () => {
  it("should get bad token error", async () => {
    await request(app)
      .post("/guests/auth/activate/badToken")
      .send()
      .expect(400);
  });

  it("should activate user", async () => {
    await request(app)
      .post(`/guests/auth/activate/${firstUser.activateToken}`)
      .expect(200);

    const user = await User.findOne({ email: firstUser.email });

    expect(user?.active).toBe(true);
    expect(user?.activateToken).toBeUndefined();
  });
});

describe("POST /guests/auth/passwordReset", () => {
  it("should get email doesn't exists", async () => {
    await request(app)
      .post("/guests/auth/passwordReset")
      .send({ email: "dummy@email.com" })
      .expect(400);
  });

  it("should create password reset token", async () => {
    await request(app)
      .post("/guests/auth/passwordReset")
      .send({ email: firstUser.email })
      .expect(200);
  });
});

describe("POST /guests/auth/validateResetToken", () => {
  it("should get invalid token error", async () => {
    await request(app)
      .post("/guests/auth/validateResetToken")
      .send({ token: "invalid" })
      .expect(400);
  });

  it("should find user by token", async () => {
    const user = await User.findOne({ email: firstUser.email });

    await request(app)
      .post("/guests/auth/validateResetToken")
      .send({ token: user?.resetPasswordToken })
      .expect(200);
  });
});

describe("POST /guests/auth/passwordReset/:token", () => {
  it("should get invalid token error", async () => {
    await request(app)
      .post("/guests/auth/passwordReset/invalid")
      .send({ password: "new123123", password2: "new123123" })
      .expect(400);
  });

  it("should change user password", async () => {
    const user = await User.findOne({ email: firstUser.email });
    const oldPass = user?.password;

    await request(app)
      .post(`/guests/auth/passwordReset/${user?.resetPasswordToken}`)
      .send({ password: "new123123", password2: "new123123" })
      .expect(200);

    const updatedUser = await User.findOne({ email: firstUser.email });

    expect(updatedUser?.resetPasswordToken).toBeUndefined();
    expect(updatedUser?.resetPasswordExpires).toBeUndefined();
    expect(updatedUser?.password).not.toMatch(oldPass || "notSamePass");
  });
});

describe("POST /guests/auth/resendActivateMail/:id", () => {
  it("should get user don't exists", async () => {
    await request(app)
      .post("/guests/auth/resendActivateMail/5e668c02907c4a0fcaeb30dc")
      .expect(500);
  });

  it("should resend activation mail", async () => {
    await request(app)
      .post(`/guests/auth/resendActivateMail/${firstUser._id}`)
      .expect(200);
  });
});

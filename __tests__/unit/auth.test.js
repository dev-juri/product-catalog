jest.mock("../../models/UserModel.js");
jest.mock("bcryptjs");

const bcrypt = require("bcryptjs");
const authController = require("../../controllers/AuthController.js");
const User = require("../../models/UserModel.js");

describe("Unit tests for Auth controller", () => {
  let req, res, next;
  let mockUser;

  beforeEach(() => {
    mockUser = {
      _id: "1234567890abcdef12345678",
      email: "john@doe.com",
      fullName: "John Doe",
      createdAt: "2023-10-01T00:00:00.000Z",
      updatedAt: "2023-10-01T00:00:00.000Z",
    };

    req = {
      params: {},
      body: { email: mockUser.email, password: "@Wsdxyz123" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    jest.clearAllMocks();
  });

  describe("loginUser", () => {
    it("should return a 404 if User doesn't exist", async () => {
      
      User.findOne.mockReturnValueOnce({
        select: jest.fn().mockResolvedValueOnce(null),
      });

      await authController.loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: false,
        error: "User with the email does not exist",
      });
    });

    it("should return a 401 if password is incorrect", async () => {
      
      User.findOne.mockReturnValueOnce({
        select: jest.fn().mockResolvedValueOnce(mockUser),
      });

      bcrypt.compare.mockResolvedValueOnce(false);

      await authController.loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
});

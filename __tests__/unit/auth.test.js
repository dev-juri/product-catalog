jest.mock("../../models/UserModel.js");
jest.mock("bcryptjs");
jest.mock("../../jwt/JwtHelper.js", () => ({
  generateToken: jest.fn(),
  verifyToken: jest.fn(),
}));

const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../../jwt/JwtHelper.js");
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

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    jest.clearAllMocks();
  });

  describe("loginUser", () => {
    beforeEach(() => {
      req = {
        body: { email: mockUser.email, password: "@Wsdxyz123" },
      };
    });

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
      expect(bcrypt.compare).toHaveBeenCalledWith(
        req.body.password,
        mockUser.password
      );
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("should generate tokens and return 200 with json rsponse", async () => {
      User.findOne.mockReturnValueOnce({
        select: jest.fn().mockResolvedValueOnce(mockUser),
      });

      bcrypt.compare.mockResolvedValueOnce(true);

      User.findByIdAndUpdate.mockResolvedValueOnce(mockUser);

      generateToken.mockReturnValue("mockToken");

      await authController.loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        req.body.password,
        mockUser.password
      );
      expect(generateToken).toHaveBeenCalledWith(mockUser, false);
      expect(generateToken).toHaveBeenCalledWith(mockUser, true);
      expect(generateToken.mock.calls.length).toBe(2);
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUser._id,
        { refreshToken: "mockToken" },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: true,
        message: "User successfully logged in",
        data: {
          accessToken: "mockToken",
          refreshToken: "mockToken",
        },
      });
    });
  });

  describe("refreshToken", () => {
    beforeEach(() => {
      req = { body: { refreshToken: "mockedRefreshToken" } };
    });

    it("should return 401 if token is invalid", async () => {
      verifyToken.mockReturnValueOnce(null);

      await authController.refreshToken(req, res, next);

      expect(verifyToken).toHaveBeenCalledWith(req.body.refreshToken);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("should return 404 if user doesn't exist", async () => {
      verifyToken.mockReturnValue({ id: mockUser._id });

      User.findById.mockReturnValueOnce({
        select: jest.fn().mockResolvedValueOnce(null),
      });

      await authController.refreshToken(req, res, next);

      expect(verifyToken).toHaveBeenCalledWith(req.body.refreshToken);
      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should return 401 if refreshToken is invalidated", async () => {
      verifyToken.mockReturnValue({ id: mockUser._id });

      User.findById.mockReturnValueOnce({
        select: jest
          .fn()
          .mockResolvedValueOnce({ ...mockUser, refreshToken: "newMockedToken" }),
      });

      await authController.refreshToken(req, res, next);
      
      expect(req.body.refreshToken).not.toBe(mockUser.refreshToken);
      expect(verifyToken).toHaveBeenCalledWith(req.body.refreshToken);
      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("should return 200 and generate new token", async() => {
      verifyToken.mockReturnValue({ id: mockUser._id });
      generateToken.mockReturnValue("mockedNewAccessToken");

      User.findById.mockReturnValueOnce({
        select: jest
          .fn()
          .mockResolvedValueOnce({ ...mockUser, refreshToken: req.body.refreshToken }),
      });

      mockUser.refreshToken = req.body.refreshToken;

      await authController.refreshToken(req, res, next);

      expect(verifyToken).toHaveBeenCalledWith(req.body.refreshToken);
      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(generateToken).toHaveBeenCalledWith(mockUser, false);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: true,
        message: "Access token generated successfully",
        data: {
          accessToken: "mockedNewAccessToken",
        },
      })
    })
  });
});

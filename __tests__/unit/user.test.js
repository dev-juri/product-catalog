jest.mock("../../models/UserModel");

const User = require("../../models/UserModel");
const userController = require("../../controllers/userController");

describe("Unit tests for User Controller", () => {
  let req, res, next;
  let mockUser;

  beforeEach(() => {
    req = {
      body: jest.fn(),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    mockUser = {
      _id: "1234567890abcdef12345678",
      email: "john@doe.com",
      fullName: "John Doe",
      createdAt: "2023-10-01T00:00:00.000Z",
      updatedAt: "2023-10-01T00:00:00.000Z",
    };
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should return 409 if user already exists", async () => {
      req.body = {
        email: mockUser.email,
        fullName: mockUser.fullName,
        password: "Password123",
      };
      User.findOne.mockResolvedValueOnce(mockUser);

      await userController.registerUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(res.status).toHaveBeenCalledWith(409);
    });

    it("should return 201 if user account was successfully created", async () => {
      let newUser = {
        email: "john@doe.com",
        fullName: "John Doe",
        password: "Password123",
      };
      req.body = newUser;
      User.findOne.mockResolvedValueOnce(null);

      User.mockImplementation(() => ({
        ...req.body,
        save: jest.fn().mockResolvedValue(newUser),
      }));

      await userController.registerUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(User).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("updateUser", () => {
    beforeEach(() => {
      req.user = mockUser;
    });

    it("should return 404 if user doesn't exist", async () => {
      User.findById.mockResolvedValueOnce(null);

      await userController.updateUserDetails(req, res, next);
      expect(User.findById).toHaveBeenCalledWith(req.user._id);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should return 200 if update was successful", async () => {
      req.body = { fullName: "Jamie Doe" };
      User.findById.mockResolvedValueOnce(mockUser);
      User.findByIdAndUpdate.mockResolvedValueOnce({
        ...mockUser,
        fullName: req.body.fullName,
      });

      await userController.updateUserDetails(req, res, next);

      expect(User.findById).toHaveBeenCalledWith(req.user._id);
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        req.user._id,
        req.body,
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("deleteUser", () => {
    beforeEach(() => {
      req.user = mockUser;
    });

    it("should retun 404 if user doesn't exist", async () => {
      User.findById.mockResolvedValueOnce(null);

      await userController.deleteUser(req, res, next);

      expect(User.findById).toHaveBeenCalledWith(req.user._id);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should return 200 if user was successfully deleted", async () => {
      User.findById.mockResolvedValueOnce(mockUser);
      User.findByIdAndUpdate.mockResolvedValueOnce(mockUser);

      await userController.deleteUser(req, res, next);

      expect(User.findById).toHaveBeenCalledWith(req.user._id);
      expect(User.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});

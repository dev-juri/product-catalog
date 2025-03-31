const User = {
  findOne: jest.fn().mockReturnValue({
    select: jest.fn(),
  }),
  create: jest.fn(),
  findById: jest.fn().mockReturnValue({
    select: jest.fn()
  }),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

module.exports = User;
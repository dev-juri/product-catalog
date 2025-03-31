const User = jest.fn().mockImplementation((userData) => ({
  ...userData,
  save: jest.fn().mockResolvedValue({ ...userData, _id: "mockedUserId" }),
}));

User.findOne = jest.fn().mockReturnValue({
  select: jest.fn(),
});

User.create = jest.fn();

User.findById = jest.fn().mockReturnValue({
  select: jest.fn(),
});

User.findByIdAndUpdate = jest.fn().mockImplementation((userId, updateData) =>
  Promise.resolve({
    _id: userId,
    ...updateData,
  })
);

User.findByIdAndDelete = jest.fn();

module.exports = User;

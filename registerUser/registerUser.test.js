const registerUser = require("./registerUser")
const Database = require("./database")

test("saves user record in the database", function () {
  const email = "fakeuser@oregonstate.edu"
  const password = "pa$$word"

  const spy = jest.spyOn(Database, "save")
  spy.mockImplementation(function () {})

  registerUser(email, password)

  // expect(spy).toHaveBeenCalled()
  expect(spy).toHaveBeenCalledTimes(1)

  spy.mockRestore()
})

test("password is being hashed before it's stored", function () {
  const email = "fakeuser@oregonstate.edu"
  const password = "pa$$word"

  const spy = jest.spyOn(Database, "save")
  spy.mockImplementation(function () {})

  registerUser(email, password)

  // const userRecord = spy.mock.calls[0][0]
  const userRecord = spy.mock.lastCall[0]

  expect(userRecord).toMatchObject({
    password: expect.not.stringContaining(password)
  })

  // expect().toBe(expect.not.stringContaining())

  spy.mockRestore()
})



test("correctly returns null on error", function () {
  const email = "fakeuser@oregonstate.edu"
  const password = "pa$$word"

  const spy = jest.spyOn(Database, "save")
  spy.mockImplementation(function () {
    throw new Error()
  })

  const result = registerUser(email, password)

  expect(result).toBeNull()

  spy.mockRestore()
})

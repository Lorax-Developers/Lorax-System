/* eslint-disable no-undef */

/*
Testing smart contracts is very important because you need to make sure that they work perfectly before going live on the blockchain.


Truffle uses the Mocha testing framework and Chai for assertions to provide you with a solid framework from which to write your JavaScript tests.
Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, 
making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, 
while mapping uncaught exceptions to the correct test cases. Hosted on GitHub.


The describe call is what gives structure to your test suite i.e. logically group your tests
i.e. `describe()` is merely for grouping

The it call identifies each individual tests but by itself it does not tell Mocha anything about how your test suite is structured. 
i.e. `it()` is a test case

`before()`, `beforeEach()`, `after()`, `afterEach()` are hooks to run before/after first/each it() or describe().

Ref - https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
*/

// eslint-disable-next-line no-undef
const Bottle = artifacts.require("Plasticbottle"); //const Day1Registry = artifacts.require("../contracts/Day1Registry.sol");

// eslint-disable-next-line no-undef
contract("Plasticbottle", (accounts) => {
  // predefine parameters
  let bottleInstance;
  const qrcode = "1234567890";
  const title = "Fanta";
  const status = "manufactured";
  const bottleSize = 500;
  const sizeUnit = "ml";

  before(async () => {
    // fetch deployed instance of Day1Registry contract
    bottleInstance = await Bottle.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await bottleInstance.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  describe("adding a bottle", async () => {
    it("should contain zero bottles in the beginning", async function () {
      // get the number of bottles
      let bottleCounter = await bottleInstance.getNumberOfBottles();
      // check that there are no users initially
      assert.equal(bottleCounter, 0, "initial number not equal to zero");
    });

    it("should add a bottle to the registry", async function () {
      // register a user from account 0
      await bottleInstance.registerBottle(qrcode, title, status, bottleSize, sizeUnit, {
        from: accounts[0],
      });
      // get the number of bottles
      let bottleCounter = await bottleInstance.NumberofBottles();
      // check that there is one bottle now registered
      assert.equal(bottleCounter, 1, "bottle was not successfully uploaded");
    });

    it("retrieve added bottle from the registry", async function () {
      // retrieve the bottle details
      let bottle = await bottleInstance.BottleArray(0);
      // check that they match the original bottle details
      assert.equal(
        user["manufacturer"],
        accounts[0],
        "added by address does not match"
      );
      assert.equal(bottle["qrcode"], qrcode, "bottleQR does not match");
      assert.equal(bottle["title"], title, "bottleTitle does not match");
      assert.equal(bottle["status"], title, "bottleStatus does not match");
      assert.equal(bottle["bottleSize"], bottleSize, "bottleTitle does not match");
      assert.equal(bottle["sizeUnit"], sizeUnit, "size does not match");
     
      //assert.equal(user["surname"], surname2, "surname does not match - decoy test");
    });
  });
});

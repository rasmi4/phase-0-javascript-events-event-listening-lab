
// index.js

// Function to add an event listener to the button
function addingEventListener() {
    const button = document.getElementById("button");
    if (button) {
        button.addEventListener("click", function() {
            console.log("Button clicked!");
        });
    }
}

// Export function for testing
if (typeof module !== "undefined") {
    module.exports = { addingEventListener };
}

// Mocha Test
if (typeof require !== "undefined" && require.main === module) {
    const { expect } = require("chai");
    const { JSDOM } = require("jsdom");
    const sinon = require("sinon");

    // Setup a fake DOM
    const dom = new JSDOM(`<!DOCTYPE html><button id="button">Click me</button>`);
    global.document = dom.window.document;

    describe("addingEventListener", function() {
        it("binds an event listener to the button", function() {
            const button = document.getElementById("button");
            const spy = sinon.spy(button, "addEventListener");

            addingEventListener();

            expect(spy.calledOnce).to.be.true;
            expect(spy.calledWith("click")).to.be.true;

            spy.restore(); // Clean up after test
        });
    });

    // Run tests
    require("mocha").run();
}

import React from 'react';
import renderer from 'react-test-renderer';


import { testThis100 } from './../App';
import { betterBeTrue } from './../App';
import { filterByTerm } from './../App';

//TODO actual tests

//3 Test examples - 1 failed, 1 passed, 1 skipped
// + one test which is commented-out because it can't be run here

  describe("Simple Examples", () => {
    /*this test should pass
    test('100?', () => {
        expect(testThis100()).toBe(100);
    });
    //Test expected to fail
    test('100?', () => {
      expect(betterBeTrue()).toBeTruthy();
    }); */

    test('adds 1 + 2 to equal 3', () => {
      expect(1+2).toBe(3);
    });

  });

//This test is skipped because the function can't be expected to work
describe("Filter function", () => {
  test.skip("it should filter by a search term (link)", () => {
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" }
    ];

    const output = [{ id: 3, url: "https://www.link3.dev" }];

    expect(filterByTerm(input, "link")).toEqual(output);
  });
});

//non-working example for a test that uses a rendered component
//ehich is also a dynamic component dependent on {getByTestId} :

//test("username exists", () => {
//  const { getByTestId } = render(
//    <Avatar username="Timonweb" src="https://example.com/avatar.jpg" />
//  );
//  expect(getByTestId(/username/i).textContent).toBe("Timonweb");
//});

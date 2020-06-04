import * as tt from "../src/index";

describe("ambient declaration tests", function () {
  this.timeout(10000);
  it("should compile examples successfully against typescript-definition-tester.d.ts", (done) => {
    tt.compileDirectory(
      "./test/examples",
      (fileName: string) => {
        console.log("fileName", fileName);
        return fileName.indexOf(".ts") > -1;
      },
      () => done()
    );
  });
});

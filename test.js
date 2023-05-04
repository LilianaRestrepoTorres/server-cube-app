const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./server");

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET /files/data", () => {
  it("should return an array of files with formatted lines", async () => {
    const res = await chai
      .request(app)
      .get("/files/data")
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .timeout(6000);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");

    res.body.forEach((file) => {
      expect(file).to.have.property("filename");
      expect(file).to.have.property("lines").that.is.an("array");

      file.lines.forEach((line) => {
        expect(line).to.have.property("file").that.is.a("string");
        expect(line).to.have.property("text").that.is.a("string");
        expect(line).to.have.property("number").that.is.a("number");
        expect(line).to.have.property("hex").that.is.a("string");
      });
    });
  });
});

describe('GET /files/list', () => {
  it('should return an array of file names', async () => {
    const res = await chai.request(app)
      .get('/files/list')
      .set("Authorization", `Bearer ${process.env.API_KEY}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("files").that.is.an("array");
  });
});
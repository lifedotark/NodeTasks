import TinyEmitter from "tiny-emitter";
import Request from "browser-request";

class NTask extends TinyEmitter {
  constructor() {
    super();
    this.request = Request;
    this.URL = "https://localhost:8080";
  }
}

module.exports = NTask;

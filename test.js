const callOllama = require("./src/config/callOllama");

(async () => {
  const res = await callOllama("Say hello in one line.");
  console.log(res);
})();

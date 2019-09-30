const yargs = require("yargs");
const validator = require("validator");
const notes = require("./notes");

yargs.command({
  command: "add",
  describe: "add a note",
  builder: {
    title: {
      describe: "new title",
      type: "string"
    },
    body: {
      describe: "new body",
      type: "string"
    }
  },
  handler: function(argv) {
    notes.addNotes(argv.title, argv.body);
  }
});
yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      type: "string"
    }
  },
  handler: function(argv) {
    notes.removeNotes(argv.title);
  }
});
yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      title: "string"
    }
  },
  handler: function(argv) {
    notes.readNote(argv.title);
  }
});
yargs.command({
  command: "list",
  describe: "list a note",
  handler: function() {
    notes.listNotes();
  }
});

console.log(yargs.argv);

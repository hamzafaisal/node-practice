const fs = require("fs");
const chalk = require("chalk");

getNotes = function() {};

listNotes = function() {
  let notes = loadNotes();
  notes.forEach(note => {
    console.log("Title: " + note.title);
    console.log("Body: " + note.body);
    console.log(chalk.red("---------------------"));
  });
};

readNote = function(title) {
  let notes = loadNotes();
  let note = notes.find(note => note.title == title);
  if (note) {
    console.log(chalk.green("---------------------"));
    console.log("Title: " + note.title);
    console.log("Body: " + note.body);
    console.log(chalk.green("---------------------"));
  } else {
    console.log(chalk.red.inverse("No Record Found!"));
  }
};

addNotes = function(title, body) {
  let notes = loadNotes();
  let titleExist = notes.filter(note => note.title.match(title));

  if (titleExist.length > 0) {
    console.log("choose another title");
  } else {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
  }
};

removeNotes = function(title) {
  let notes = loadNotes();
  let index = notes.findIndex(note => note.title === title);

  if (index >= 0) {
    notes.splice(index, 1);
    saveNotes(notes);
  } else {
    console.log("title not found");
  }
};

saveNotes = function(notes) {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

loadNotes = function() {
  try {
    const rfile = fs.readFileSync("notes.json", "utf8");
    return JSON.parse(rfile);
  } catch (error) {
    return [];
  }
};

module.exports = { getNotes, addNotes, removeNotes, listNotes, readNote };

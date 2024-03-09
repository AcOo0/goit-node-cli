import * as dbService from "./contacts.js";

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await dbService.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const oneContact = await dbService.getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await dbService.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await dbService.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

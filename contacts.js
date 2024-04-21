import * as fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactToFind = contacts.find((contact) => contact.id === contactId);
  if (typeof contactToFind === "undefined") return null;
  return contactToFind;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactToDelete = contacts.find((contact) => contact.id === contactId);
  if (typeof contactToDelete === "undefined") return null;
  const newContact = contacts.filter(
    (contact) => contact.id !== contactToDelete
  );
  fs.writeFile(contactsPath, JSON.stringify(newContact));
  return contactToDelete;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contactToAdd = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contacts.push(contactToAdd);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactToAdd;
}

export { listContacts, getContactById, removeContact, addContact };

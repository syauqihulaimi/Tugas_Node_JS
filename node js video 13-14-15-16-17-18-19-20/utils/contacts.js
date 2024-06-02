import { name } from "ejs";
import * as fs from "node:fs";

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

export const loadContacts = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

export const findContact = (id) => {
  const contacts = loadContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact;
};

const saveContact = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));
};

const getNewId = (contacts) => {
  if (contacts.length === 0) {
    return "C001";
  }
  const lastId = contacts[contacts.length - 1].id;
  const numericPart = parseInt(lastId.slice(1)) + 1;
  return `C${numericPart.toString().padStart(3, "0")}`;
};

export const addContact = (newContactData) => {
  const contacts = loadContacts();
  const newContact = {
    id: getNewId(contacts),
    name: newContactData.name,
    email: newContactData.email,
    phoneNumber: newContactData.phoneNumber,
  };
  contacts.push(newContact);
  saveContact(contacts);
};

export const checkDuplicity = (value) => {
  const contacts = loadContacts();
  return contacts.find((contact) => contact.name === value);
};

export const deleteContact = (id) => {
  const contacts = loadContacts();
  const filteredContact = contacts.filter((contact) => contact.id !== id);
  saveContact(filteredContact);
};

export const updateContacts = (newContact) => {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter((contact) => contact.name !== newContact.oldName);
  const newContactEntry = {
    id: getNewId(contacts),
    name: newContact.name,
    email: newContact.email,
    phoneNumber: newContact.phoneNumber,
  };
  delete newContact.oldName;
  filteredContacts.push(newContactEntry);
  saveContact(filteredContacts)
};
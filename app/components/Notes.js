// notes.js
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore, auth } from "@/lib/firebase";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ name: "" });
  const user = auth.currentUser;

  // Add notes to database
  const addNote = async (e) => {
    e.preventDefault();
    if (newNote.name !== "" && user) {
      await addDoc(collection(firestore, "notes"), {
        userId: user.uid,
        name: newNote.name.trim(),
      });
      setNewNote({ name: "" });
    }
  };

  // Read notes from database
  useEffect(() => {
    if (user) {
      const q = query(
        collection(firestore, "notes"),
        where("userId", "==", user.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let notesArr = [];

        querySnapshot.forEach((doc) => {
          notesArr.push({ ...doc.data(), id: doc.id });
        });
        setNotes(notesArr);

        return () => unsubscribe();
      });
    }
  }, [user]);

  // Delete notes from database
  const deleteNote = async (id) => {
    if (user) {
      await deleteDoc(doc(firestore, "notes", id));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4 text-center">User Notes</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-white">
            <input
              value={newNote.name}
              onChange={(e) => setNewNote({ ...newNote, name: e.target.value })}
              className="col-span-5 p-3 border"
              type="text"
              placeholder="Enter a Note"
            />

            <button
              onClick={addNote}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl ml-8"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {notes.map((note, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="normal-case">{note.name}</span>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="ml-10 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Notes;

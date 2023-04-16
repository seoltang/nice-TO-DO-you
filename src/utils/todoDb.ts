import { onAuthStateChanged } from 'firebase/auth';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  type DocumentReference,
  type DocumentData,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from 'src/firebase';

class TodoDb {
  #docRef: DocumentReference<DocumentData>;

  constructor() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.#docRef = doc(db, 'todo', user.uid);
      }
    });
  }

  async read() {
    const docSnap = await getDoc(this.#docRef);

    if (docSnap.exists()) {
      const todos = docSnap.data().todos;
      if (todos) return todos;
    }

    return [];
  }

  listen(setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>) {
    onSnapshot(this.#docRef, (doc) => {
      if (doc.exists()) {
        const todos = doc.data().todos;
        if (todos) setTodos(todos);
      }
    });
  }

  async create(newTodo: TodoType) {
    const todos = await this.read();

    if (todos.length === 0) {
      await setDoc(this.#docRef, { todos: [newTodo] }, { merge: true });
      return;
    }

    await updateDoc(this.#docRef, {
      todos: arrayUnion(newTodo),
    });
  }

  async update(todos: TodoType[]) {
    await updateDoc(this.#docRef, {
      todos,
    });
  }

  async delete(id: string) {
    const todos = await this.read();

    const deletedTodo = todos.find((todo: TodoType) => todo.id === id);

    if (deletedTodo) {
      await updateDoc(this.#docRef, {
        todos: arrayRemove(deletedTodo),
      });
    }
  }
}

const todoDb = new TodoDb();

export default todoDb;

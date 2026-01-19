import { api } from "./api";
import { User, LoginCredentials, RegisterCredentials } from "@/types/user";
import { Note, NewNote } from "@/types/note";

interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
  perPage?: number;
}

export const checkSession = async (): Promise<void> => {
  await api.get("/auth/session");
};

export const getUser = async (): Promise<User> => {
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const updateMe = async (data: { username: string }): Promise<User> => {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
};

export const login = async (data: LoginCredentials) => {
  const response = await api.post<{ user: User }>("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterCredentials) => {
  const response = await api.post<{ user: User }>("/auth/register", data);
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const fetchNotes = async (
  params?: FetchNotesParams,
): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await api.get("/notes", { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: NewNote) => {
  const response = await api.post<Note>("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string) => {
  await api.delete(`/notes/${id}`);
};

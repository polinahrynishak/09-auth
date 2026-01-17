import { cookies } from "next/headers";
import axios from "axios";
import { User } from "@/types/user";
import { Note } from "@/types/note";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const getServerApi = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  return axios.create({
    baseURL,
    headers: {
      Cookie: cookieString,
    },
    withCredentials: true,
  });
};

export const getMeServer = async (): Promise<User> => {
  const api = await getServerApi();
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const api = await getServerApi();
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNotes = async (
  params?: object,
): Promise<{ notes: Note[]; totalPages: number }> => {
  const api = await getServerApi();
  const response = await api.get<{ notes: Note[]; totalPages: number }>(
    "/notes",
    { params },
  );
  return response.data;
};

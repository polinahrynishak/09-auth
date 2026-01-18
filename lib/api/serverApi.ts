import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import { api } from "./api";

interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
  perPage?: number;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const getServerApi = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  api.defaults.headers.common["Cookie"] = cookieString;

  return api;
};

export const checkSessionServer = async (): Promise<User | null> => {
  try {
    const serverApi = await getServerApi();
    const response = await serverApi.get<User>("/auth/session");
    return response.data;
  } catch {
    return null;
  }
};

export const getMeServer = async (): Promise<User> => {
  const api = await getServerApi();
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const serverApi = await getServerApi();
  const response = await serverApi.get<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNotes = async (
  params?: FetchNotesParams,
): Promise<{ notes: Note[]; totalPages: number }> => {
  const serverApi = await getServerApi();
  const response = await serverApi.get<{ notes: Note[]; totalPages: number }>(
    "/notes",
    { params },
  );
  return response.data;
};

export const refreshSessionServer = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const response = await fetch(`${baseURL}/auth/session`, {
    method: "GET",
    headers: {
      Cookie: cookieString,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to refresh session");
  }

  return response;
};
